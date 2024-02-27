const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const cityController = require("../controllers/cityController");
const countryController = require("../controllers/countryController");
const stateController = require("../controllers/stateController");
const validateRequest = require("../middlewares/validation");
const authMiddleware1 = require('../middlewares/auth');
const {signUpSchema,signInSchema,deleteUserByIdSchema,updateUserByIdSchema,getUserByIdSchema,forgetPasswordSchema,getAllUsersSchema,signOutSchema,editOtherUserDetailsSchema,editUserPasswordSchema} = require("../validations/userSchema");
const {createCountry,updateCountry,deleteCountry,getCountry,getAllCitiesInCountry} = require("../validations/countrySchema")
const {createState,updateState,deleteState,getState,getAllStates,getAllCitiesInAState} = require("../validations/stateSchema");
const {createCity,updateCity,deleteCity,getCity,getAllCities} = require("../validations/citySchema");



//user routes


router.post('/signUp',validateRequest(signUpSchema),userController.signUp);

router.post("/signIn",validateRequest(signInSchema),userController.signIn);

router.get('/user',authMiddleware1.authMiddleware,validateRequest(getUserByIdSchema),userController.getUserById);

router.put("/user",authMiddleware1.authMiddleware,validateRequest(updateUserByIdSchema),userController.updateUserById);

router.delete("/user",authMiddleware1.authMiddleware,validateRequest(deleteUserByIdSchema),userController.deleteUserById);

router.get('/forgetPassword',validateRequest(forgetPasswordSchema),userController.forgetPassword);

router.get('/allUsers',validateRequest(getAllUsersSchema),authMiddleware1.authMiddleware,userController.getAllUsers);

router.post('/signOut', validateRequest(signOutSchema),authMiddleware1.authMiddleware,userController.signOut);

router.put("/editOtherUserDetails",authMiddleware1.authMiddleware,validateRequest(editOtherUserDetailsSchema),userController.editOtherUserDetails);

router.put("/editPasswordOfTheUser",authMiddleware1.authMiddleware,validateRequest(editUserPasswordSchema),userController.editOtherUserPassword)

// country routes


router.post('/country',validateRequest(createCountry),countryController.createCountry);

router.get('/country',validateRequest(getCountry),countryController.getCountry);

router.put('/country',validateRequest(updateCountry),countryController.updateCountry);

router.delete('/country',validateRequest(deleteCountry),countryController.deleteCountry);

router.get('/getAllCities',validateRequest(getAllCitiesInCountry),countryController.getAllCitiesInACountry);


// state routes


router.post('/state',validateRequest(createState),stateController.createState);

router.get('/state',validateRequest(getState),stateController.getState);

router.get('/allStates',validateRequest(getAllStates),stateController.getAllStates);

router.put('/state',validateRequest(updateState),stateController.updateState);

router.delete('/state',validateRequest(deleteState),stateController.deleteState);

router.get('/allCities',validateRequest(getAllCitiesInAState),stateController.getAllCitiesInAState);


// city routes


router.post('/city',validateRequest(createCity),cityController.createCity);

router.get('/city',validateRequest(getCity),cityController.getCity);

router.get('/allCities',validateRequest(getAllCities),cityController.getAllCities);

router.put('/city',validateRequest(updateCity),cityController.updateCity);

router.delete('/city',validateRequest(deleteCity),cityController.deleteCity)


module.exports = router;