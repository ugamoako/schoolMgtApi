const express = require('express');
const passport = require('passport');
const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/userController');
const UserMetaController = require('./controllers/userMetaController');
const SchoolDataController = require('./controllers/schoolDataController');
const ScoreDataController = require('./controllers/scoresDataController');
const TermDataController = require('./controllers/termDataController');
//const ChatController = require('./controllers/chat');
//const CommunicationController = require('./controllers/communication');
//const StripeController = require('./controllers/stripe');

const ROLE_MEMBER = require('./constants').ROLE_MEMBER;
const ROLE_CLIENT = require('./constants').ROLE_CLIENT;
const ROLE_OWNER = require('./constants').ROLE_OWNER;
const ROLE_ADMIN = require('./constants').ROLE_ADMIN;
const router = express.Router();
const passportService = require('./config/passport');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });
router.get('/me', function(req,res){
    res.send('hello im here');
})
router.post('/register', AuthController.register);
router.post('/login', requireLogin, AuthController.login);
router.post('/userMeta', requireAuth, UserMetaController.postData);
router.get('/getUserMeta', requireAuth, UserMetaController.getUserMetaAll);
router.get('/getUserMeta/:userId', requireAuth, UserMetaController.getUserMeta);
//router.delete('/getUserMeta/:id', requireAuth, UserMetaController.deleteUserMeta);
router.put('/updateUserMeta/:id', requireAuth, UserMetaController.updateUserMeta);

router.post('/postSchool', requireAuth, SchoolDataController.postSchoolData);
router.get('/getSchool', requireAuth, SchoolDataController.getSchoolData);
router.get('/getSchool/:userId', requireAuth, SchoolDataController.getSchoolData);
//router.delete('/getSchoolData/:id', requireAuth, SchoolDataController.deleteSchoolData);
router.put('/updateSchoolData/:id', requireAuth, SchoolDataController.updateSchoolData);

router.post('/postScore', requireAuth, ScoreDataController.postScore);
//router.get('/getScoreData', requireAuth, ScoreDataController.getScoreDataAll);
router.get('/getScore/:studentId', requireAuth, ScoreDataController.getScoreI);
router.get('/getScore/:studentId/:class/:term', requireAuth, ScoreDataController.getScoreICT);
router.get('/getScore/:schoolId/:year/:class/:term', requireAuth, ScoreDataController.getScoreSYCT);
router.get('/getScore/:schoolId/:year/:class/:term/:subject', requireAuth, ScoreDataController.getScoreSYCTS);
//router.delete('/getScoreData/:id', requireAuth, ScoreDataController.deleteScoreData);
router.put('/updateScore/:id', requireAuth, ScoreDataController.updateScoreData);

router.post('/termData', requireAuth, TermDataController.postTermData);
router.get('/getTermData', requireAuth, TermDataController.getTermData);
router.get('/getTermData:userId', requireAuth, TermDataController.getTermData);
//router.delete('/getTermData/:id', requireAuth, UserMetaController.deleteUserMeta);
router.put('/updateTermData/:id', requireAuth, TermDataController.updateTermData);
/**/
/*module.exports = function (app) {
  // Initializing route groups
  const apiRoutes = express.Router(),
    authRoutes = express.Router(),
    userRoutes = express.Router();
    //chatRoutes = express.Router(),
    //payRoutes = express.Router(),
    //communicationRoutes = express.Router();

  //= ========================
  // Auth Routes
  //= ========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);
console.log('losss');
  // Registration route
  authRoutes.post('/register', AuthController.register);

  // Login route
  authRoutes.post('/login', requireLogin, AuthController.login);

  // Password reset request route (generate/send token)
  authRoutes.post('/forgot-password', AuthController.forgotPassword);

  // Password reset route (change password using token)
  authRoutes.post('/reset-password/:token', AuthController.verifyToken);

  //= ========================
  // User Routes
  //= ========================

  // Set user routes as a subgroup/middleware to apiRoutes
  apiRoutes.use('/user', userRoutes);

  // View user profile route
  userRoutes.get('/:userId', requireAuth, UserController.viewProfile);

  // Test protected route
  apiRoutes.get('/protected', requireAuth, (req, res) => {
    res.send({ content: 'The protected test route is functional!' });
  });

  apiRoutes.get('/admins-only', requireAuth, AuthController.roleAuthorization(ROLE_ADMIN), (req, res) => {
    res.send({ content: 'Admin dashboard is working.' });
  });

  //= ========================
  // Chat Routes
  //= ========================

  // Set chat routes as a subgroup/middleware to apiRoutes
  //apiRoutes.use('/chat', chatRoutes);

  // View messages to and from authenticated user
  //chatRoutes.get('/', requireAuth, ChatController.getConversations);

  // Retrieve single conversation
 // chatRoutes.get('/:conversationId', requireAuth, ChatController.getConversation);

  // Send reply in conversation
  //chatRoutes.post('/:conversationId', requireAuth, ChatController.sendReply);

  // Start new conversation
  //chatRoutes.post('/new/:recipient', requireAuth, ChatController.newConversation);

  //= ========================
  // Payment Routes
  //= ========================
  //apiRoutes.use('/pay', payRoutes);

  // Webhook endpoint for Stripe
 // payRoutes.post('/webhook-notify', StripeController.webhook);

  // Create customer and subscription
  //payRoutes.post('/customer', requireAuth, StripeController.createSubscription);

  // Update customer object and billing information
  //payRoutes.put('/customer', requireAuth, StripeController.updateCustomerBillingInfo);

  // Delete subscription from customer
  //payRoutes.delete('/subscription', requireAuth, StripeController.deleteSubscription);

  // Upgrade or downgrade subscription
  //payRoutes.put('/subscription', requireAuth, StripeController.changeSubscription);

  // Fetch customer information
  //payRoutes.get('/customer', requireAuth, StripeController.getCustomer);

  //= ========================
  // Communication Routes
  //= ========================
  //apiRoutes.use('/communication', communicationRoutes);

  // Send email from contact form
  //communicationRoutes.post('/contact', CommunicationController.sendContactForm);

  // Set url for API group routes
  app.use('/api', apiRoutes);
};*/
module.exports = router;