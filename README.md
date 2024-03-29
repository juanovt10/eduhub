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

### User Goals
- See exisiting courses 
- Filter exisiting courses 
- Sort exisiting courses 
- Load more courses 
- Load more reviews 
- See all course information (including reviews and enrollments) 
- Create courses (instructors only) 
- Edit courses (instructors only) 
- Delete courses (instructors only) 
- See other profiles informatiobn 
- Create user profile 
- Edit user profile 
- Delete user profile 
- Create reviews 
- Edit reviews 
- Delete reviews 
- Add courses to wish list 
- Enroll in courses 
- Apply for instructor status 
- Navigate across the website 
- Registration 
- Log in 
- Log out 
- Learn about the website and see the FAQs 
- See the feature courses in home page 


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

- When a user successfully signs in for the first time a create profile form is displyed for the user to complete their profile information. 

![createProfileLg](/src/assets/images-readme/createProfileLg.png)
![createProfileSm](/src/assets/images-readme/createProfileSm.png)

- The user can fill the form or close it. However, if the form is not filled, each time the user signs in this form will be displayed. 

- When the user fills the create from is then directed to their profile page where all the inforamtion is displayed. This includes the biography, avatar, preferred name, instructor status and the information about their reviews, wish lists and enrollments. 

![profileLg](/src/assets/images-readme/profileLg.png)
![profileSm](/src/assets/images-readme/profileSm.png)

- In their profile the user has the access to edit and delete profile actions, similar to the reveiws and courses. 

![editProfileLg](/src/assets/images-readme/editProfileLg.png)
![editProfileSm](/src/assets/images-readme/editProfileSm.png)
![profileDelete](/src/assets/images-readme/profileDelete.png)

- following the purpose of this site, is not only about learning from others but learn by teaching. therfore, new users will need to apply for instructor status using the cyan button in their profile. This will open an application form. 

![instructorForm](/src/assets/images-readme/instructorForm.png)

- After the user applies, it takes some time until the adminsitrator changes their profile to instructor profile. However, whislt the administrators approve, the button will still available but the user will get feedback that their applicaiton is being processed. 

![instructorFeedback](/src/assets/images-readme/instructorFeedback.png)

- When a user is already an instructor, their profile looks slighly different. this includes a golden icon stating that theyr are instructors and, on top of wish list, enrollments and reviews, they can see the courses they have created. 

![profileInstructorLg](/src/assets/images-readme/profileInstructorLg.png)
![profileInstructorSm](/src/assets/images-readme/profileInstructorSm.png)

- When visiting other non-instrutor profiles, the user can only see the general information of the user but not details of ther wish list, enrollments or reviews. Here the dropdown nor instructor applicaiton buttons are rendered.

![profileVisit](/src/assets/images-readme/profileVisit.png)

- When visiting an instructor profile the user also cannot see details but they can see that this user is an instructor and if this user has creacted any courses, they can see them. 

![profileVisitInstructor](/src/assets/images-readme/profileVisitInstructor.png)


#### Not exisit page
- As the user is able to type any type of url in the browser. A noExisit page is displayed informing the user that this url does not exisit and they either can type another url or return to their previous url, where the link is added for them to return.

![notExist](/src/assets/images-readme/notExist.png)

### Future Features
The main idea of this project is to provide a marketing front end for a future LMS. Therfore, the idea is for this project to evolve from a simple CRUD application to a intricate LMS where users can enroll in courses but can access content including videos, articles, tests. Also providing a dashboard where they can manage their learning. However, for the exisitng project I the following features could be implemented: 

- A more intricate instructor application, including a CV input that can describe the users experience. 
- Notificaitons to inform the users when they get their instructor status approved. 
- Notifications when reveiws are placed, enrollments and added to wish lists. 

## Testing

### Methodology 
Testing was an integral part of the project development. A comprehensive testing approach was adopted, outlined below. This involved meticulous manual testing to ensure alignment with all user stories and acceptance criteria

#### Home page

| Test  | Steps | Expected Outcome | Results |  
| - | - | - | - |
| Navigation bar (user not authenticated) | Access the website without logging in, review the available links and click in all available links | All logged out links are displayed and successfully redirect the user to the desired pages | PASS |
| Navigation bar (user authenticated) | Access the website and  log in, review the available links and click in all available links | All logged in links are displayed and successfully redirect the user to the desired pages | PASS |
| Herp section links | Click 'learn more' and 'explore courses' buttons | Both buttons redirect the user to the desired pages | PASS | 
| Home feature courses displayed | Check the courses displayed in the home page | The courses with the highest ratings are displayed | PASS |
| Home FAQs | Click all FAQs in the accordion element | All accordion elements are behave as expected | PASS |

#### Courses page
| Test  | Steps | Expected Outcome | Results |  
| - | - | - | - |
| Filters functionality | Select specific filters, apply the filters and check the results | The courses displayed after the application of the filters match the filters selected | PASS |
| Reset filters | Click the reset filter button | The courses are refecth without any filters | PASS |
| Course sorting | Click in all four sorting options | The courses are successsfully sorted in the desired sorting | PASS |
| Course card display | Check that cards are displayed in the correct way even when results are less than 2 | Courses are displayed in the correct way even if the results are less than 2 | PASS |
| Load more courses | After the first 10 courses, click in the 'load more courses' button | After clicking the button, 10 more courses are loaded | PASS |
| Course card link functionality | Click in different course cards and check if the redirection is correct | The 'explore course' button successfully redirect the user to the specific course | PASS |

#### Course detail page
| Test  | Steps | Expected Outcome | Results |  
| - | - | - | - |
| Course information display | Check if all the relevant information of the course is displayed | The owner, enrollment count, video hours, articles, tests and price are displayed successfully | PASS |
| Authentication alert | Enter to a course without logging in | The user sees the danger alert and the course action buttons are not displayed | PASS |
| Owner alert | Enter a course that that has been created with the same user | The user sees the warning alert and the course actions buttons and the craete review forms are not displayed | PASS |
| Owner actions display | Enter a course that that has been created with the same user | The user sees the three dots dropdown and can access the edit and delete course options | PASS |
| Edit course | As a course owner click in the edit course option and edit the course | The course is successfully edited | PASS |
| Delete course | As a course owner click in the delete course option and delete the course | The course is successfully deleted and the user is redirected to the courses page | PASS |
| Create review form | As a authorised user but not the owner of a course, access a course | The review create form is successfully rendered | PASS |
| Create review functionality |  As a authorised user but not the owner of a course, access a course and leave a review | The form shows the loader but after the request is processed the from dissapears, the review appears below and teh review overview is updated | PASS | 
| Review actions | Access a course where a review has been placed | The review should display the dropdown menu with the edit and delete review actions | PASS | 
| Review edit | Click in the review edit action and edit the reivew | The review is successfully edited, it is rendered in the course page and the reviews overviews update | PASS |
| Review delete | Click in the review delete action and delete the reivew | The review is successfully deleted and the reviews overviews update | PASS |
| Load more reviews | Access a course with more than 10 reviews and click the 'load more reviews' button | After clickin the button more reviews are loaded | PASS |

#### Authentication page
| Test  | Steps | Expected Outcome | Results |  
| - | - | - | - |
| Authentication rendered (no-authenticated) | As a logged out click in the 'join us' button | The signup and signin forms are successfully rendered | PASS |
| Authentication redirection (authenticated) | As a logged in user try to access the authentication page my typing the /auth url | The user is redirected back to the home page | PASS |
| Sign up form | Create a new user | The registration is successfull and the user is shown the sign in form with a success alert | PASS |
| Sign in form | Sign in | The user is redirected to the page they were before the authentication request | PASS |
| Authentication alerts | In both sign in and sign up forms fill the fields wrongly | Warning alerts are displayed | PASS |

#### Profile page
| Test  | Steps | Expected Outcome | Results |  
| - | - | - | - |
| Profile creation render | Sign up and sign in to the site | The create profile form is displayed | PASS |
| Profile creation functionality | Fill the fields and submit the from | If the fields are successfully filled, the user is redirected to their profile where they can see all their information. If the fields are not filled correctly, alerts are displayed | PASS |
| Self profile view (no-instructor) | Access the user profile | All user information should be displayed, the become instructor button should be displaued, the options button should be displayed and the wish list, enrollment and reviews should be displayed | PASS | 
| Self profile view (instructor) | Access the user profile as an instructor | All user information should be displayed, the gold instructor icon should be displayed the options button should be displayed and the your courses, wish list, enrollment and reviews should be displayed | PASS |
| Edit profile | Click the edit profile option in the dropdown options | The form is rendered successfully with the fields prepopulated, if the form is submitted wrongly alerts are displayed and if is submitted successfully the profile refetches the new information | PASS |
| Delete profile | Click the delete profile option in the dropdown options | The delete form is rendered and if clicked the user is deleted, logged out and then redirected to the home page | PASS |
| Instructor applicaiton form | Access a self profile without instructor status and click the instructor icon is displayed in the cyan button | The applicaiton form is successfully displayed, and when submitted it closes | PASS |
| Instructor applicaiton feedback | After submitting the application form, try again to click that button | The form is not rendered and a feedback message is rendered for the user to wait until the application is processed | PASS |
| Visit non-istructor profile | Access another user profile that does not have the instructor status | All information of the user should be displayed with the exception of the instructor application and acitons buttons, details of which courses are in enrollments, wish lists or reviews | PASS |
| Visit istructor profile | Access another user profile with instructor status | All the relevant information is displayed, the gold instructor icon is rendered and the instructor courses are displayed below | PASS |

### Validator testing 

1. CSS 

## Technologies used

### Programming languages
- HTML5
- CSS3
- JavaScript
- Python
- SQL - Postgres

### Frameworks, Libraries and programs used

- Google Fonts: For site fonts
- Font Awesome: For site icons
- GitPod: online IDE
- GitHub: Store repository and version control
- Am I responsive: For responsiveness display
- Favicon: To provide icon in tab bar
- Django Rest: Use to build the backend API
- React-Bootstrap: Library of reusable components
- Shadcn/ui: Library with more flexible components than React Bootstrap
- Typescript: Only used to run the Shadcn/ui components
- Tailwind CSS: Only used to run the Shadcn/ui components
- ReactJS: To build the components that will compose the front end applicaiton 

## Components

Multiple components were used through this project with the capability of reusability to avoid repeatitive tasks. 

1. axiosDefaults.js: streamlined the API calls with the REST API
2. Asset.js: mainly used to provide loading feedback to the client.
3. Avatar.js: To display users profile images in the reviews, profile pages and navbar.
4. Dropdown.js: user to provide edit and delete actions for courses, reviews and profiles. 
5. Rating.js: The main focus of this project was to provide course overall ratings but also the rating of each review. This reusable component was key to display this information. 
6. RatingInput.js: This component was used to interactively input the rating in a review. This component is located in the CreateReviewForm and EditReviewForm. 
7. useClickToggle.js: component to hide the collapsable navbar elements when clicking anywhere else in the website
8. useRedirect.js: component to redirect logged in users from the /auth URL.
9. CourseDisplay.js: even though this component is related to the courses page, it is used in the home page, courses page and profile page to display courses depending on filtering and sorting. 

## Deployment

The site was deployed to Heroku. The steps to deploy are as follows:

1. Launch the gitpod workspace.
2. Install ReactJS:

```
npx create-react-app . --use-npm
npm start
```

3. Install the following dependencies:

```
react-bootstrap@1.6.3 bootstrap@4.6.0
react-router-dom@5.3.0
axios
msw --save-dev
jwt-decode
-g eslint
tailwindcss-animate
class-variance-authority
clsx
tailwind-merge
lucide-react
@radix-ui/react-icons
-D tailwindcss
```

4. Tailwind and TypeScript configurations
As mentioned in the secion above, Tailwind and TypeScript where used only to use the shadin/ui front end components.


## Credits

### Design

### Code

### Media

### Content