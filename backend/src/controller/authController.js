const Pool = require("pg").Pool;
const fs = require("fs");
const bcrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "Jwt_secret_key";

//get connection pool using configuratin parameters from db.json
function getPool() {
  try {
    const dbConfig = fs.readFileSync("./backend/config/db.json", "utf8");
    return new Pool(JSON.parse(dbConfig));
  } catch (error) {
    console.log(error);
    return null;
  }
}
const pool = getPool();


//user registration
const registerUser = async (request, response) => {
  const user = request.body;
  const salt = await bcrpt.genSalt(10);
  const hash = await bcrpt.hash(user.password, salt);
  //check if user exist
  const userexits = await pool.query(
    "select from users where username=$1 or email=$2",
    [user.username, user.email]
  );
  if (userexits.rows.length > 0)
    return response.status(400).json({ 'responseMessage': "User already exist" });

  try {
    pool.query(
      "Insert into users(first_name,last_name,username,email,password,phone_number)  values( $1,$2,$3,$4,$5,$6) returning id,email,role",
      [
        user.first_name,
        user.last_name,
        user.username,
        user.email,
        hash,
        user.phone_number
      ],
      (error, result) => {
        if (error) {
       
          throw new Error(error);
        }
       else if(result)
        {
          
           response.status(201).send({ 'responseMessage': `User created with ID:${result.rows[0].id}` });
        }
        else 
          {
            console.log("result", result);
            response.status(500).send({ 'Error':'unable to create user' });
          }
       
      }
    );
  } catch (error) {
    console.error('Error while registering user:', error.message, error.stack);
    response.status(500).send({ 'Error': 'Internal server error' });
  }
};

const login = async (request, response) => {
  const { email, password } = request.body;
 
  try {
    //find user by email
    const user = await pool.query("select *from users where email=$1", [email]);
    if (user.rowCount === 0)
      return response
        .status(400)
        .json({ 'responseMessage': "User doesn't exist" });
    
    const hash = user.rows[0].password;
     
    //compare saved hashed password and given password
    const validCredentials = bcrpt.compare(password, hash);
    if (!validCredentials)
      return response
        .status(400)
        .json({ 'responseMessage': "Invalid Credentials" });

    const name = user.rows[0].first_name + " " + user.rows[0].last_name;
    const userInfo = {
      id: user.rows[0].id,
      email: user.rows[0].email,
      username: user.rows[0].username,
      name: name,
      role: user.rows[0].role,
    };
    const json_web_token = jwt.sign(userInfo, JWT_SECRET, {
      expiresIn: "0.5h",
    });

    //return jwt token with user information

    response.status(200).json({ token: json_web_token, user: userInfo });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ 'responseMessage': "Server error" });
  }
};

const getUsers = (request, response) => {
  try {
    pool.query(
      "select id,first_name,last_name,username,email,phone_number,role from users",
      (error, result) => {
        if(error)
           console.log('error',error.message,);
        if (!result) {
          response.status(404).send({ 'error': "result not found" });
        } else {
          response.status(200).json(result.rows);
        }
      }
    );
  } catch (error) {
    response.status(500).json({ 'error': 'Internal server error' });
  }
};

const getUserById = (request, response) => {
  try {
  
    const id = parseInt(request.params.id);
    pool.query(
      "select first_name,last_name,username,email,phone_number,role from users where users.id=$1",
      [id],
      (error, result) => {
        if (error)
          throw new Error("Error while executing select from users query");
        else if (!result) {
          return response.status(404).send({ error: "result not found" });
        } else {
          return response.status(200).json(result.rows);
        }
      }
    );
  } catch (error) {
    console.log("error", error.message);
    return response.status(500).send({ error: error.message });
  }
};

const updateUser = async (request, response) => {
  const id = parseInt(request.params.id);
  const user=request.body;
  console.log('id',id)

  if(!id || !user.first_name|| !user.last_name || !user.username || !user.email || !user.phone_number )
    return  response.status(400).send({ 'Error': 'Missing required fields or user_id' });

  try {
    const result= await pool.query( "update  users set first_name=$1,last_name=$2,username=$3,email=$4,phone_number=$5 where id=$6  returning *",
           [user.first_name,user.last_name,user.username,user.email,user.phone_number,id]);
    if (result.rows && result.rows.length > 0) {
      return response.status(200).send({ 'User  updated': result.rows[0] });
  } else {
      return response.status(404).send({ 'Error': 'User not found' });
  }
    
  } catch (error) {
    
  }
};

const updateUserRole= async (request,response)=>{
  const id= request.params.id;
  const user_role= request.body.role;

  if(!id || !user_role)
    return  response.status(400).send({ 'Error': 'Missing required fields or user_id' });
  try {
    const result= await pool.query("update users set role= $1 where id = $2 returning id,first_name,last_name,username role ",[user_role,id]);
    if (result.rows && result.rows.length > 0) {
      return response.status(200).send({ 'user role updated': result.rows[0] });
  } else {
      return response.status(404).send({ 'Error': 'User not found' });
  }
    
  } catch (error) {
    
  }
}



module.exports.registerUser = registerUser;
module.exports.login = login;
module.exports.getUsers = getUsers;
module.exports.getUserById = getUserById;
module.exports.updateUser = updateUser;
module.exports.updateUserRole=updateUserRole;
