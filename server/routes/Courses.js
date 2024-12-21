const express = require('express')
const router = express()

// import category controllers;
const {createCategories, showAllCategories} = require('../controllers/Category')

// import course routes
const {createCourse, getCourseDetails} = require('../controllers/Course')

// import middleware.
const {auth, isAdmin, isInstructor} = require('../middlewares/auth') 

// import Section controllers.
const {createSection, updateSection, deleteSection} = require('../controllers/Section')

// import Sub Section
const {createSubSection, updateSubSection} = require('../controllers/SubSection')

// course routes.
router.post('/create-course', auth, isInstructor, createCourse)
router.post('/get-course-details', getCourseDetails)

// category routes
router.post('/create-category',auth, isAdmin, createCategories)
router.get('/show-all-category', showAllCategories)

// Section Routes.
router.post('/create-section', createSection)
router.post('/update-section',auth, isInstructor, updateSection )
router.delete('/delete-section', auth, isInstructor, deleteSection)

// subSection routes.
router.post('/create-sub-section',auth, isInstructor, createSubSection)
router.put('/update-sub-section', auth, isInstructor, updateSubSection )

module.exports = router;