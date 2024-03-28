# Eduhub Learning Platform

Eduhub is a platform design for people that want to learn by teaching. Similar to ohter learning platforms, eduhub allows you to browse courses depending on the type of content you want to learn and allows you to find the best course for you depending on varius categories such as, but not limited to, budget, course cateogry, ratings, enrollment numbers, etc. The main difference is that this platform is design for not experts but people that are learning a topic to master it by creating courses and engage with the exisitng community. 

Additionally, after signin up to the platform you have a profile page where you can manage the courses you have enroll to, added to your wish list and your existing reviews. 

## Table of contents

+ [UX](#ux)
+ [Design](#design)
+ [Features](#features)
+ [Testing](#testing)
+ [Technologies used](#technologies-used)
+ [Deployment](#deployment)
+ [Credits](#credits)

## UX

### Site Purpose
Eduhub is a site dedicated to enhance learning through teaching. Its been proven that mastery on a topic increases significantly by teaching to others and learning questions that otherwise would not be asked. Therefore, Eduhub provides a platform where user can learn topics and then tehy can apply to instructor status to create their own courses. 

### Audience
Eduhub focuses on two main audiences. Users that are looking to understand the basics of any topic comming from non-experts and it focus on mid-knowledge people that are looking to expand their knowledge by teaching others. 

### Current User Goals
- See exisiting courses
- Filter exisiting courses
- Sort exisiting courses
- Load more courses
- See all course information (including reviews and enrollments)
- Create courses
- Edit courses
- Delete courses
- Create their user profile
- Edit the user profile 
- Delete user profile 
- Create course reviews
- Edit reviews
- Delete reviews
- Add courses to wish list
- Enroll in courses
- Apply for instructor status

### Future User Goals

## Design

### Color scheme

ADD SCREENSHOT

### Typography

The body of the elements on the website utilized the font Roboto.This selection enhances the professional appearance of an education site.

### Imagery
The imagery added to the courses and user profiles was source from free stock platform. 

### Agile methodology
Agile project management principles guided the development of this project, leveraging GitHub Projects as the primary software for tracking user stories. Utilizing the Kanban board task view, I crafted a comprehensive user story template that served as the foundation for all project-related narratives. Beyond capturing the core user stories, GitHub Projects played a pivotal role in efficiently monitoring and addressing bugs identified throughout the project's lifecycle.

### Wireframes

ADD WIREFRAMES

### Database schema

The databse schema is composed of 5 models: user profile, course, ratings, wish list and enrollments. 

When a new user signs up on the website, a user profile instance is automatically generated, utilizing a One-to-One Field with the username. Subsequently, the user is redirected to the home page where a modal style sheet welcomes them to the platform as request them to fill their profile. After the user creates their profile, this modal is never displayed again from them.

The course model contains the author as a foreign key representing the user that created the course, followed by other character, text, integer and float fields.



## Features

### Existing Features

#### NavBar
- On large screens, when the user is not signed in, the navbar only displays the brand logo, a button to direct the user to the courses page and a sign in button. 

![signOutNavbar](/src/assets/images-readme/navBarSignOut.png)

- On large screens, when the user is signed in but is not an instructor, the navbar displays the brand logo, a button to direct the user to the courses page, a sign out button and a go to profile button.

![signInNavBar](/src/assets/images-readme/navBarSignIn.png)

- On large screens, when the user is signed in and the user is an instructor, the navbar displays the the same buttons as they display for non-instructor users plus a "create course" button for the user to create a course in any page they want. 

![signInInstructorNavBar](/src/assets/images-readme/navBarSignInInstructor.png)


- On smaller screens, the navbar display the same buttons as for large screens, but it is collapsed into a burger menu, where then the options are stakced vertically. 

![signOutNavbarCollapsed](/src/assets/images-readme/navBarSignOutCollapsed.png)
![signInNavbarCollapsed](/src/assets/images-readme/navBarSignInCollapsed.png)
![signInInstructorNavbarCollapsed](/src/assets/images-readme/navBarSignInInstructorCollapsed.png)

#### Home page

- It contains a hero section that has a catchy slogan and a brief explanation to the site. Below these, there are two call to action buttons, one to direct the user to the main page of the site, the course page, and a second one to move them to the about section below that explains the website further.

![heroSectionLg](/src/assets/images-readme/heroLg.png)
![heroSectionSm](/src/assets/images-readme/heroSm.png)

- The about page contains static text that describes the website.

![aboutSectionLg](/src/assets/images-readme/aboutLg.png)
![aboutSectionSm](/src/assets/images-readme/aboutSm.png)

- The feature course seciton in the home page, displays the two courses with the bests ratings of the website. This can vary depending on the rating that users give to each courses. 

![featureCoursesLg](/src/assets/images-readme/featuredCoursesLg.png)
![featureCoursesSm](/src/assets/images-readme/featuredCoursesSm.png)

- Finally, the home page provides a FAQ section that addresses the main quesiton new and exsiting users may have regarding the website. 

![FAQsLg](/src/assets/images-readme/FAQsLg.png)
![FAQsSm](/src/assets/images-readme/FAQsSm.png)

#### Courses Page

- The courses page is design to display all the available courses in the website in Card layouts to briefly describe the course information. 

![coursesLg](/src/assets/images-readme/coursesLg.png)
![coursesSm](/src/assets/images-readme/coursesSm.png)

- The course page has the feature to filter the courses in three categories: available resources (videos, articles or tests), course categories and ratings. The user can choose as many filters as desired, when the filters are applied, the course page fetch the courses with the specified filters. When the filters are restarted the course page fetches all courses again. 

![filterCard](/src/assets/images-readme/filterCard.png)
![filterSheet](/src/assets/images-readme/filterSheet.png)

- The course page has the feature to sort courses in 4 categories: rating, enrollment count, price and newest. When a sorting option is clicked, the page fetches the courses depending on the optioned selected and keeps the tab 'on' to provide feedback to the user what sorting has been applied. 

![sortingCard](/src/assets/images-readme/sortingCard.png)
![sortingSheet](/src/assets/images-readme/sortingSheet.png)

- Each course is displayed in a card layout. The card contains the image of the course, title, a part of the description, the price, enrollment count, resources available and a link to explore the course in detail. The resources are layed out as icons, but they have an overlay trigger so when the user hovers or tabs the icon it displays the amount of resources available. 

![courseCard](/src/assets/images-readme/courseCard.png)

- As the API is design to fetch a limit amount of data to avoid high loading times, a button to display further resutls is added at the bottom of the courses to fetch further results. 

![coursesPagination](/src/assets/images-readme/coursesPagination.png)

#### Create course 

- The create course feature is only available to users that have instructor status. As creating courses is one of the primary features of the website, instructor users can easily create courses regardless of their locaiton withing the website as the sheet containing the create courses form is embbeded in the navbar. 

![signInInstructorNavBar](/src/assets/images-readme/navBarSignInInstructor.png)

- The instructor will have to input all fields if they want to create a course. These include: title, description, image, cateogory (from a dropdown), cost, video hours, article count and test count. 

![createCourseLg](/src/assets/images-readme/createCourseLg.png)
![createCourseSm](/src/assets/images-readme/createCourseSm.png)

- If for whatever reason the user does not fill the fields correctly, the form will not be submitted and the alerts will be displayed indicating the field issue. 

![createCourseAlerts](/src/assets/images-readme/createCourseAlerts.png)

#### Course (detail) page 

- The course page is design to display all the relevant information about the course, including the complete description, reviews, resourses data and enrollments. 

![courseDetailLg](/src/assets/images-readme/courseDetailLg.png)
![courseDetailSm1](/src/assets/images-readme/courseDetailSm1.png)
![courseDetailSm2](/src/assets/images-readme/courseDetailSm2.png)

- Restrictions are applied to users that are not logged in. Threfore, a warning alert is displayed to inform the user if they want to take any action in the course they need to register first. 

![courseDetailLoggoutAlert](/src/assets/images-readme/courseDetailLoggedOutAlert.png)

- The owner of the course also has an alert stating that they are the owners and where they cannot place a review, enroll nor add to wish list, they can edit or delete the course. 

![courseDetailOwnerAlert](/src/assets/images-readme/courseDetailOwnerAlert.png)

- Even if the user does not use the links in the alert to edit or delete the course. There is an dropdown action menu on the top-left that allows the owner to open the edit course form or delete course. 

![courseOwnerActions](/src/assets/images-readme/courseOwnerActions.png)

- When clicking the delete course action, a form opens confirming the course deletion action. 

![courseDelete](/src/assets/images-readme/courseDelete.png)

- When the user selects the edit course. A form similar to the create course form is displayed with the fields populated with the exisiting course information. 

![editCourseLg](/src/assets/images-readme/editCourseLg.png)
![editCourseSm](/src/assets/images-readme/editCourseSm.png)

- If the user is logged in and is not the owner of the course, two options are displayed: add to wish list and enrollment.

![courseActions](/src/assets/images-readme/courseActions.png)

- If the user decides to add the course to the wish list, a feedback card will appear as soon the wish list request is processed stating that the course was successfully added to their wish list, where they can chekc in theri profile or they can enroll to the course straight away.

![wishListFeedback](/src/assets/images-readme/wishListFeedback.png)

- In the case the user decides to enroll direclty to the course, a similar card is displayed, but in this case there won't be any option to add the course to the wish list. The reson behind this is that if a user enrolls to a course they had in their wish list, this course is deleted from their wish list and added to their enrollments.

![enrollmentFeedback](/src/assets/images-readme/enrollmentFeedback.png)

- Another key feature of the course page is the reviews section. This is splited into three secions, the reviews overview, the reviews and the review create form. 
    - Reviews overview displays the overall rating of the course, the total rewview count and 5 progress bars displaying how many reviews the course have in each specific rating.

    ![reviewOverview](/src/assets/images-readme/reviewOverview.png)

    - The review create form is displayed next to the reviews overview if the user has not place a review on that course 

    ![reviewForm](/src/assets/images-readme/reviewForm.png)

    - All reviews are then displayed in the course seciton. The review includes the avatar of the user, user username, when the review was created and the review information.

    ![reviews](/src/assets/images-readme/reviews.png)

    - Similar to the course actions, each review will display the action menu to their owner. This menu is the same as the one for the courses, it can edit or delete the review. 

    ![reviewEdit](/src/assets/images-readme/reviewEdit.png)
    ![reviewDelete](/src/assets/images-readme/reviewDelete.png)

    - As it was done for the courses, the reviews are also paginated to avoid high loading times. If a course has more than 10 reviews, a button will be displayed to allow the user to load more reviews. 

    ![reviewPagination](/src/assets/images-readme/reviewPagination.png)


#### Registration
- When the users are not logged in, they have varius limitations in the website, such as not being able to have a personalized profile nor take any actions on the courses. Threfore, in the navbar it is displayed a button "Join us" that will redirect the user to the authentication page. 

- The authentication page contains the sign up and sign in forms. The sign up form requests the user a unique username a password and to confirm the password. 

![signUp](/src/assets/images-readme/signUp.png)

- If the user does not fill the fields correctly, alerts will be displayed to provide feedback to the user.

![signUpAlerts](/src/assets/images-readme/signUpAlerts.png)

- In the sign in form, the user is requested to input their credentials to log in.

![signIn](/src/assets/images-readme/signIn.png)

- Similar to the sign up form, if the user credentails are not valid, alerts are displayed. 

![signInAlerts](/src/assets/images-readme/signInAlerts.png)

- When the user signs up, it is redirected to the sign in form but a success alert is displayed to inform the user that the registration process was successful. 

![signUpSuccess](/src/assets/images-readme/signUpSuccess.png)


#### User profile 






    











### Future Features

## Testing

### Methodology 

#### Home page


#### Courses page

#### Course detail page

#### Profile page

#### Authentication page


### Testing user stories from UX section 

#### All users

#### Existing  Goals

#### Future User Goals


### Validator testing 

## Technologies used

### Programming languages

### Frameworks, Libraries and programs used


## Deployment

### Forking the Github repository 

### Running the project locally


### Deploying with Heroku

#### External database set up

#### External storage set up


#### env.py file set up

#### Heroku settings 

#### Heroku deployment

## Credits

### Design

### Code

### Media

### Content