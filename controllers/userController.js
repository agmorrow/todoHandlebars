const res = require('express/lib/response');
const {
  User
  }  = require('../models');



module.exports = {
  createUser: async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
    return res.status(400).json({ error: 'You must provide a username, email, and password.' });
  }

  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    res.json(user);
  } catch (e) {
    res.json(e);
  }
},

// getting users
getAllUsers: async (req, res) => {

req.session.save(() => {
  if (req.session.visitCount) {
    req.session.visitCount++;
  } else {
    req.session.visitCount = 1;
  }
});

  try {
    const usersData = await User.findAll({});
    const users = usersData.map(user => user.get({ plain: true }));
    
  res.render('allUsers', {
    users,
    favoriteFood: 'Tacos',
    visitCount: req.session.visitCount,
    loggedInUser: req.session.user || null,
  });
  } catch (e) {
    res.json(e)
  }
},

getUserById: async (req, res) => {
  req.session.save(() => {
    if (req.session.visitCount) {
      req.session.visitCount++;
    } else {
      req.session.visitCount = 1;
    }
  });
  try{
    const userData = await User.findByPk(req.params.userId);
    const user = userData.get({ plain: true });
    res.render('singleUser', {
      user,
      visitCount: req.session.visitCount,
    });
  } catch (e) {
    res.json(e);
  }
},
login: async (req, res) => {
  console.log(req.body);
  try {
    //first find the user with the given email address
    const userData = await User.findOne({ email: req.body.email });
  const userFound = userData.get({ plain: true });
    // check if the password from the from is the same password as the user found
    // with the given email
    console.log(userFound);
    console.log(userFound.password, 80);
    console.log(req.body.password, 81);
    if (userFound.password === req.body.password) {
      console.log('Im hit', 83);
      req.session.save(() => {
        req.session.user = userFound
        res.json({ success: true });
      });
    }
    // if that is true, ave the uer found in req.session.user
    // if false, ignore it for now
  } catch (e) {
    console.log(e);
    res.json(e);
  }
}

}