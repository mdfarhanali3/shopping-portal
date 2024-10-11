const User = require("../models/user_model");
const authUtil = require("../util/authentication");
const validation = require("../util/validation");
const sessionFlash = require("../util/session-flash");

function getSignup(req, res) {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData)
    {
    sessionData =
    {
      email: '',
      confirmEmail: '',
      password: '',
      fullname: '',
      street: '',
      postal: '',
      city: '',
    };
  }

  res.render('customer/auth/signup', { inputData: sessionData });
}
async function signup(req, res) {
  const enteredData = {
    email: req.body.email,
    confirmEmail: req.body['confirm_email'],
    password: req.body.password,
    fullname: req.body.name,
    street: req.body.street,
    postal: req.body.code,
    city: req.body.city,
  };

  if (
    !validation.userDetailsAreValid
    (
      req.body.email,
      req.body.password,
      req.body.name,
      req.body.street,
      req.body.code,
      req.body.city
    ) 
      ||
    !validation.emailIsConfirmed(req.body.email, req.body['confirm_email'])
  )
  {
    sessionFlash.flashDataToSession
    (
      req,
      {
        errorMessage:
          'Please check your input. Password must be at least 6 characters long, postal code must be 5 characters long.',
        ...enteredData,
      },
      function () {
        res.redirect('/signup');
      }
    );
    return;
  }

  const user = new User(
    req.body.email,
    req.body.password,
    req.body.name,
    req.body.street,
    req.body.code,
    req.body.city
  );

  try
  {
    const existsAlready = await user.existsAlready();

    if (existsAlready)
    {
      sessionFlash.flashDataToSession(
        req,
        {
          errorMessage: 'User exists already! Try logging in instead!',
          ...enteredData,
        },
        function () {
          res.redirect('/signup');
        }
      );
      return;
    }

    await user.signup();
  }

  catch (error) {
    next(error);
    return;
  }

  res.redirect("/login");
}
function getLogin(req, res) {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: '',
      password: '',
    };
  }

  res.render('customer/auth/login', { inputData: sessionData });
}

async function login(req, res) {
  const user = new User(req.body.email, req.body.password);

  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  }
  catch (error) {
    next(error);
    return;
  }

  const sessionErrorData = {
    errorMessage:
      'Invalid credentials - please double-check your email and password!',
    email: user.mail,
    password: user.password,
  };

  if (!existingUser) {
    sessionFlash.flashDataToSession(req, sessionErrorData, function () {
      res.redirect('/login');
    });
    return;
  }

  const passwordIsCorrect = await user.isMatchPassword(existingUser.password);

  if (!passwordIsCorrect) {
    sessionFlash.flashDataToSession(req, sessionErrorData, function () {
      res.redirect('/login');
    });
    return;
  }

  authUtil.createUserSession(req, existingUser, function () {
    res.redirect('/');
  });
//   const existingUser = await user.getUserWithSameEmail();

//   if (!existingUser) {
//     res.redirect("/login");
//     return;
//   }

//   const passwordIsCorrect = await user.isMatchPassword(existingUser.password);

//   if (!passwordIsCorrect) {
//     res.redirect("/login");
//     return;
//   }

//   authUtil.createUserSession(req, existingUser, function () {
//     res.redirect("/");
//   });
}

function logout(req, res) {
  authUtil.DestroyUserAuthSession(req);
  res.redirect("/");
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout,
};
