var express = require('express');
var router = express.Router();
const data = require('../data/users');
const auth = require('../middleware/auth');

// api/users/
/* GET users listing. */
router.get('/',auth, async(req, res, next) => {
  const users = await data.getAllUsers();
  res.send(users);
});

router.post('/', async (req,res)=>{
  const result = await data.addUser(req.body);
  res.send(result);
});

// router.post('/login')

router.post('/login', async(req,res)=>{
  try {
    const user = await data.findByCredentials(req.body.email,req.body.password);

    const token = data.generateAuthToken(user);
    
    res.send({user,token});


  } catch (error) {
    res.status(401).send(error.message);
  }
})

module.exports = router;
