const BASE_URL = process.env.REACT_APP_BASE_URL;

export const categories = {
    CATEGORIES_API : BASE_URL + "/course/show-all-category"
}

// Auth APIs
export const endpoints = {
    SENDOTP_API: BASE_URL+"/auth/sendotp",
    SIGNUP_API: BASE_URL+"/auth/signup",
    LOGIN_API: BASE_URL+ "/auth/login",
    RESETPASSTOKEN_API: BASE_URL+ "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL+ "/auth/reset-password",
}

// Contact Us APIs
export const contactusEnpoints = {
    CONTACT_US_API: BASE_URL + "/reach/contact-us"
}

export const profileEndpoints = {
    GET_USER_ENROLLED_COURSES_API : BASE_URL + "/profile/get-enrolled-courses"
}

// course End points
export const courseEndpoints = {
    GET_ALL_COURSE_API: BASE_URL + "/course/get-all-course", // done
    COURSE_DETAILS_API: BASE_URL + "/course/get-course-details", // done
    EDIT_COURSE_API: BASE_URL + "/course/editCourse", // ---> PENDING
    COURSE_CATEGORIES_API: BASE_URL + "/course/show-all-category", // done
    CREATE_COURSE_API: BASE_URL + "/course/create-course", // done
    CREATE_SECTION_API: BASE_URL + "/course/create-section", // done
    CREATE_SUBSECTION_API: BASE_URL + "/course/create-sub-section", // done
    UPDATE_SECTION_API: BASE_URL + "/course/update-section", // done
    UPDATE_SUBSECTION_API: BASE_URL + "/course/update-sub-section", // done
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/get-instructor-course", // done
    DELETE_SECTION_API: BASE_URL + "/course/delete-section", // done
    DELETE_SUBSECTION_API: BASE_URL + "/course/delete-sub-section", // done
    DELETE_COURSE_API: BASE_URL + "/course/detele-course", // done
    GET_FULL_COURSE_DETAILS_AUTHENTICATED:
      BASE_URL + "/course/get-full-course", // done
    LECTURE_COMPLETION_API: BASE_URL + "/course/update-course-progress", // done
    CREATE_RATING_API: BASE_URL + "/course/create-rating", // done
  }