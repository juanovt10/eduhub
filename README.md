# Eduhub Learning Platform

Eduhub is a platform designed for people who want to learn through teaching. Similar to other learning platforms, Eduhub allows users to browse courses based on the type of content they wish to learn, helping them find the best course according to various categories, including but not limited to budget, course category, ratings, and enrollment numbers. The main distinction is that this platform is designed not for experts but for individuals who are learning a topic and aim to master it by creating courses and engaging with the existing community.

![responsiveTest](/src/assets/images-readme/responsiveTest.png)

Click [here](https://eduhub-react-f1c98786bec1.herokuapp.com/) to see the live website.

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
Eduhub is a website dedicated to enhancing learning through teaching. It has been proven that mastery of a topic increases significantly by teaching others and addressing questions that might not otherwise be asked. Therefore, Eduhub offers a platform where users can learn about various subjects and then apply for instructor status to create their own courses.

### Audience
Eduhub caters to two primary audiences: users seeking to grasp the basics of any topic from non-experts and individuals with intermediate knowledge aiming to broaden their understanding by teaching others.

### User Stories

Please refer to the user stories [document](/src/assets/docs/user-stories.md) to see the user stories in detail. 

You can also refer to the [Kanban board](https://github.com/users/juanovt10/projects/3) in Github


## Design

### Color scheme

The color scheme of the website was carefully chosen to create a dark gradient background using shades of dark grey and dark blue, providing a striking contrast with the white text color. A bright orange color was selected as the primary color for calls to action, while cyan was used as the secondary color to highlight different actions.

![colorPalette](/src/assets/images-readme/colorPalette.png)

### Typography
The elements on the website use the Roboto font, which enhances the professional appearance of an educational site.

### Imagery
The website exclusively uses PNG format logos as its images. These PNG files were sourced from a free logo maker powered by AI.

### Agile methodology
Agile project management principles guided the development of this project, leveraging GitHub Projects as the primary software for tracking user stories. Utilizing the Kanban board task view, I crafted a comprehensive user story template that served as the foundation for all project-related narratives. Beyond capturing the core user stories, GitHub Projects played a pivotal role in efficiently monitoring and addressing bugs identified throughout the project's lifecycle.

### Wireframes

ADD WIREFRAMES

### Database schema

The database schema is available in the README file of the [Eduhub API Repository](https://github.com/juanovt10/eduhub-drf-react)


## Features

### Existing Features

#### NavBar
- On large screens, when the user is not signed in, the navbar displays only the brand logo, a button directing the user to the courses page, and a sign-in button.

![signOutNavbar](/src/assets/images-readme/navBarSignOut.png)

- On large screens, when the user is signed in but not an instructor, the navbar displays the brand logo, a button directing the user to the courses page, a sign-out button, and a go-to-profile button.

![signInNavBar](/src/assets/images-readme/navBarSignIn.png)

- On large screens, when a signed-in user is an instructor, the navbar displays the same buttons as for non-instructor users, with the addition of a "create course" button, allowing the user to create a course from any page.

![signInInstructorNavBar](/src/assets/images-readme/navBarSignInInstructor.png)


- On smaller screens, the navbar displays the same buttons as on large screens, but they are collapsed into a burger menu. Within this menu, the options are stacked vertically.

![signOutNavbarCollapsed](/src/assets/images-readme/navBarSignOutCollapsed.png)
![signInNavbarCollapsed](/src/assets/images-readme/navBarSignInCollapsed.png)
![signInInstructorNavbarCollapsed](/src/assets/images-readme/navBarSignInInstructorCollapsed.png)

#### Home page

- The homepage features a hero section with an engaging slogan and a concise introduction to the site. Below this, two call-to-action buttons are present: one directing users to the site's main page, the courses page, and the second leading to the about section, which provides further explanation of the website.

![heroSectionLg](/src/assets/images-readme/heroLg.png)
![heroSectionSm](/src/assets/images-readme/heroSm.png)

- The about page contains static text that describes the website.

![aboutSectionLg](/src/assets/images-readme/aboutLg.png)
![aboutSectionSm](/src/assets/images-readme/aboutSm.png)

- The featured courses section on the homepage showcases the two courses with the highest ratings on the website. These selections may change based on the ratings given by users to each course. 

![featureCoursesLg](/src/assets/images-readme/featuredCoursesLg.png)
![featureCoursesSm](/src/assets/images-readme/featuredCoursesSm.png)

- Finally, the homepage includes a FAQ section that answers the most common questions new and existing users may have about the website.

![FAQsLg](/src/assets/images-readme/FAQsLg.png)
![FAQsSm](/src/assets/images-readme/FAQsSm.png)

#### Courses Page

- The courses page is designed to display all available courses on the website in card layouts, briefly describing the course information.

![coursesLg](/src/assets/images-readme/coursesLg.png)
![coursesSm](/src/assets/images-readme/coursesSm.png)

- The course page features filters in three categories: available resources (videos, articles, or tests), course categories, and ratings. Users can apply multiple filters as desired. When filters are applied, the page fetches courses matching the specified criteria. Resetting the filters triggers the page to fetch all courses again.

![filterCard](/src/assets/images-readme/filterCard.png)
![filterSheet](/src/assets/images-readme/filterSheet.png)

- The course page offers sorting options in four categories: rating, enrollment count, price, and newest. When a sorting option is selected, the page fetches courses based on the chosen category, and the active sorting tab is highlighted to indicate the applied sorting to the user.

![sortingCard](/src/assets/images-readme/sortingCard.png)
![sortingSheet](/src/assets/images-readme/sortingSheet.png)

- Each course is presented in a card layout featuring the course image, title, a snippet of the description, price, enrollment count, available resources, and a link for detailed exploration. The resources are represented as icons with an overlay trigger that, when hovered over or tapped, displays the quantity of available resources. 

![courseCard](/src/assets/images-readme/courseCard.png)

- To manage data fetching and reduce loading times, the API is designed to retrieve a limited amount of data. Consequently, a button is provided at the bottom of the course listings to load additional results, allowing for progressive display of content.

![coursesPagination](/src/assets/images-readme/coursesPagination.png)

#### Create course 

- The create course feature is exclusive to users with instructor status, emphasizing its significance as one of the website's core functions. Instructors have the convenience of creating courses from anywhere on the site, thanks to the create course form embedded within the navbar.

![signInInstructorNavBar](/src/assets/images-readme/navBarSignInInstructor.png)

- To create a course, instructors must complete all fields, including the title, description, image, category (selected from a dropdown menu), cost, video hours, article count, and test count.

![createCourseLg](/src/assets/images-readme/createCourseLg.png)
![createCourseSm](/src/assets/images-readme/createCourseSm.png)

- If the user fails to fill in the fields correctly, the form will not submit, and alerts will appear indicating the issues with the specific fields.

![createCourseAlerts](/src/assets/images-readme/createCourseAlerts.png)

#### Course (detail) page 

- The course page is designed to display all the relevant information about the course, including the complete description, reviews, resource data, and enrollments.

![courseDetailLg](/src/assets/images-readme/courseDetailLg.png)
![courseDetailSm1](/src/assets/images-readme/courseDetailSm1.png)
![courseDetailSm2](/src/assets/images-readme/courseDetailSm2.png)

- Restrictions are applied to users who are not logged in. Therefore, a warning alert is displayed to inform the user that they need to register first if they want to take any action on the course.

![courseDetailLoggoutAlert](/src/assets/images-readme/courseDetailLoggedOutAlert.png)

- The owner of the course receives an alert stating that they are the owner, and although they cannot leave a review, enroll, or add the course to their wish list, they can edit or delete the course.

![courseDetailOwnerAlert](/src/assets/images-readme/courseDetailOwnerAlert.png)

- Even if the user does not utilize the links in the alert to edit or delete the course, there is a dropdown action menu on the top-left that allows the owner to open the edit course form or delete the course.

![courseOwnerActions](/src/assets/images-readme/courseOwnerActions.png)

- When the "delete course" action is clicked, a form opens to confirm the course deletion action.

![courseDelete](/src/assets/images-readme/courseDelete.png)

- When the user selects "edit course," a form similar to the create course form is displayed, with the fields populated with the existing course information.

![editCourseLg](/src/assets/images-readme/editCourseLg.png)
![editCourseSm](/src/assets/images-readme/editCourseSm.png)

- If the user is logged in and is not the owner of the course, two options are displayed: "Add to Wish List" and "Enroll."

![courseActions](/src/assets/images-readme/courseActions.png)

- If the user decides to add the course to their wish list, a feedback card will appear as soon as the wish list request is processed, stating that the course was successfully added to their wish list. They can then check it in their profile or enroll in the course immediately.

![wishListFeedback](/src/assets/images-readme/wishListFeedback.png)

- If the user decides to enroll directly in the course, a similar feedback card is displayed, but in this case, there won't be an option to add the course to the wish list. The reason is that if a user enrolls in a course that was on their wish list, the course is removed from their wish list and added to their enrollments.

![enrollmentFeedback](/src/assets/images-readme/enrollmentFeedback.png)

- Another key feature of the course page is the reviews section, which is split into three sections: the reviews overview, the reviews themselves, and the review creation form.
    - The Reviews Overview displays the overall rating of the course and the total review count, along with five progress bars showing the number of reviews for each specific rating.

    ![reviewOverview](/src/assets/images-readme/reviewOverview.png)

    - The review creation form is displayed next to the Reviews Overview if the user has not yet placed a review for that course.

    ![reviewForm](/src/assets/images-readme/reviewForm.png)

    - All reviews are displayed in the course section, including the user's avatar, username, the date the review was created, and the review content.

    ![reviews](/src/assets/images-readme/reviews.png)

    - Similar to the course actions, each review displays an action menu for the owner. This menu, identical to the one for courses, allows the owner to edit or delete the review.

    ![reviewEdit](/src/assets/images-readme/reviewEdit.png)
    ![reviewDelete](/src/assets/images-readme/reviewDelete.png)

    - Similar to the courses, reviews are also paginated to prevent long loading times. If a course has more than 10 reviews, a button is provided to allow users to load additional reviews.

    ![reviewPagination](/src/assets/images-readme/reviewPagination.png)


#### Registration
- When users are not logged in, they face various limitations on the website, such as the inability to have a personalized profile or take actions on courses. Therefore, a "Join us" button is displayed in the navbar, directing users to the authentication page. 

- The authentication page contains the sign-up and sign-in forms. The sign-up form requests the user's unique username, password, and confirmation of the password.

![signUp](/src/assets/images-readme/signUp.png)

- If the user does not fill out the fields correctly, alerts will be displayed to provide feedback to the user.

![signUpAlerts](/src/assets/images-readme/signUpAlerts.png)

- In the sign-in form, the user is requested to input their credentials to log in.

![signIn](/src/assets/images-readme/signIn.png)

- Similar to the sign-up form, if the user's credentials are not valid, alerts are displayed.

![signInAlerts](/src/assets/images-readme/signInAlerts.png)

- When the user signs up, they are redirected to the sign-in form, and a success alert is displayed to inform the user that the registration process was successful.

![signUpSuccess](/src/assets/images-readme/signUpSuccess.png)

#### User profile 

- When a user successfully signs in for the first time, a create profile form is displayed for the user to complete their profile information.

![createProfileLg](/src/assets/images-readme/createProfileLg.png)
![createProfileSm](/src/assets/images-readme/createProfileSm.png)

- The user can fill out the form or close it. However, if the form is not filled out, each time the user signs in, this form will be displayed.

- When the user fills out the create form, they are then directed to their profile page where all the information is displayed. This includes the biography, avatar, preferred name, instructor status, and information about their reviews, wish lists, and enrollments.

![profileLg](/src/assets/images-readme/profileLg.png)
![profileSm](/src/assets/images-readme/profileSm.png)

- In their profile, the user has access to edit and delete profile actions, similar to the reviews and courses.

![editProfileLg](/src/assets/images-readme/editProfileLg.png)
![editProfileSm](/src/assets/images-readme/editProfileSm.png)
![profileDelete](/src/assets/images-readme/profileDelete.png)

- Following the purpose of this site, which is not only about learning from others but also learning by teaching, new users will need to apply for instructor status using the cyan button in their profile. This will open an application form.

![instructorForm](/src/assets/images-readme/instructorForm.png)

- After the user applies, it takes some time until the administrator changes their profile to an instructor profile. However, while the administrators approve, the button will still be available, but the user will receive feedback that their application is being processed.

![instructorFeedback](/src/assets/images-readme/instructorFeedback.png)

- When a user is already an instructor, their profile looks slightly different. This includes a golden icon stating that they are instructors and, in addition to the wish list, enrollments, and reviews, they can see the courses they have created. 

![profileInstructorLg](/src/assets/images-readme/profileInstructorLg.png)
![profileInstructorSm](/src/assets/images-readme/profileInstructorSm.png)

- When visiting other non-instructor profiles, the user can only see the general information of the user but not details of their wish list, enrollments, or reviews. Here, the dropdown nor instructor application buttons are rendered.

![profileVisit](/src/assets/images-readme/profileVisit.png)

- When visiting an instructor profile, the user also cannot see details, but they can see that this user is an instructor and if this user has created any courses, they can see them.

![profileVisitInstructor](/src/assets/images-readme/profileVisitInstructor.png)


#### Not exisit page
- As the user is able to type any type of URL in the browser, a "Page Not Found" page is displayed, informing the user that this URL does not exist. They can either type another URL or return to their previous URL, where the link is added for them to return.

![notExist](/src/assets/images-readme/notExist.png)

### Future Features
The main idea of this project is to provide a marketing frontend for a future LMS. Therefore, the idea is for this project to evolve from a simple CRUD application to an intricate LMS where users can enroll in courses and access content including videos, articles, and tests. It also involves providing a dashboard where they can manage their learning. However, for the existing project, the following features could be implemented:

- A more intricate instructor application, including a CV input that can describe the user's experience.
- Notifications to inform the users when their instructor status is approved. 
- Notifications for reviews, enrollments, and additions to wish lists.


## Testing

### Methodology 
Testing was an integral part of the project development. A comprehensive testing approach was adopted, as outlined below. This involved meticulous manual testing to ensure alignment with all user stories and acceptance criteria.

#### Home page

| Test  | Steps | Expected Outcome | Results |  
| - | - | - | - |
| Navigation bar (user not authenticated) | Access the website without logging in, review the available links, and click on all available links | All logged-out links are displayed and successfully redirect the user to the desired pages | PASS |
| Navigation bar (user authenticated) | Access the website and log in, review the available links, and click on all available links | All logged-in links are displayed and successfully redirect the user to the desired pages | PASS |
| Hero section links | Click 'learn more' and 'explore courses' buttons | Both buttons redirect the user to the desired pages | PASS | 
| Home feature courses displayed | Check the courses displayed on the home page | The courses with the highest ratings are displayed | PASS |
| Home FAQs | Click all FAQs in the accordion element | All accordion elements behave as expected | PASS |

#### Courses page
| Test  | Steps | Expected Outcome | Results |  
| - | - | - | - |
| Filters functionality | Select specific filters, apply the filters, and check the results | The courses displayed after applying the filters match the selected filters | PASS |
| Reset filters | Click the reset filter button| The courses are refetched without any filters | PASS |
| Course sorting | Click on all four sorting options | The courses are successfully sorted in the desired sorting | PASS |
| Course card display | Check that cards are displayed correctly even when results are less than 2 | Courses are displayed correctly even if the results are less than 2 | PASS |
| Load more courses | After the first 10 courses, click the 'load more courses' button | Clicking the button loads 10 more courses | PASS |
| Course card link functionality | Click on different course cards and check if the redirection is correct | The 'explore course' button successfully redirects the user to the course | PASS |

#### Course detail page
| Test  | Steps | Expected Outcome | Results |  
| - | - | - | - |
| Course information display | Check if all the relevant information of the course is displayed | The owner, enrollment count, video hours, articles, tests, and price are displayed successfully | PASS |
| Authentication alert | Enter a course without logging in | The user sees the danger alert, and the course action buttons are not displayed | PASS |
| Owner alert |Enter a course that has been created with the same user | The user sees the warning alert, and the course actions buttons and the create review forms are not displayed | PASS |
| Owner actions display | Enter a course that has been created with the same user | The user sees the three dots dropdown and can access the edit and delete course options | PASS |
| Edit course | As a course owner, click on the edit course option and edit the course | The course is successfully edited | PASS |
| Delete course | As a course owner, click on the delete course option and delete the course | The course is successfully deleted, and the user is redirected to the courses page | PASS |
| Create review form | As an authorized user but not the owner of a course, access a course | The review create form is successfully rendered | PASS |
| Create review functionality |  As an authorized user but not the owner of a course, access a course and leave a review | The form shows the loader, but after the request is processed, the form disappears, the review appears below, and the review overview is updated | PASS | 
| Review actions | Access a course where a review has been placed | The review should display the dropdown menu with the edit and delete review actions | PASS | 
| Review edit | Click on the review edit action and edit the review  | The review is successfully edited, it is rendered on the course page, and the reviews overviews update | PASS |
| Review delete | Click on the review delete action and delete the review | The review is successfully deleted, and the reviews overviews update | PASS |
| Load more reviews | Access a course with more than 10 reviews and click the 'load more reviews' button | After clicking the button, more reviews are loaded | PASS |

#### Authentication page
| Test  | Steps | Expected Outcome | Results |  
| - | - | - | - |
| Authentication rendered (no-authenticated) | As a logged-out user, click on the 'join us' button | The signup and signin forms are successfully rendered | PASS |
| Authentication redirection (authenticated) | As a logged-in user, try to access the authentication page by typing the /auth URL | The user is redirected back to the home page | PASS |
| Sign up form | Create a new user | The registration is successful, and the user is shown the sign-in form with a success alert | PASS |
| Sign in form | Sign in | The user is redirected to the page they were before the authentication request | PASS |
| Authentication alerts | In both the sign-in and sign-up forms, fill the fields incorrectly | Warning alerts are displayed | PASS |

#### Profile page
| Test  | Steps | Expected Outcome | Results |  
| - | - | - | - |
| Profile creation render | Sign up and sign in to the site | The create profile form is displayed | PASS |
| Profile creation functionality | Fill the fields and submit the form | If the fields are successfully filled, the user is redirected to their profile where they can see all their information. If the fields are not filled correctly, alerts are displayed | PASS |
| Self profile view (non-instructor) | Access the user profile | All user information should be displayed, the "Become Instructor" button should be displayed, the options button should be displayed, and the wish list, enrollment, and reviews should be displayed | PASS | 
| Self profile view (instructor) | Access the user profile as an instructor | All user information should be displayed, the gold instructor icon should be displayed, the options button should be displayed, and the "Your Courses," wish list, enrollment, and reviews should be displayed | PASS |
| Edit profile | Click the edit profile option in the dropdown options | The form is rendered successfully with the fields prepopulated. If the form is submitted wrongly, alerts are displayed, and if it is submitted successfully, the profile refetches the new information | PASS |
| Delete profile | Click the delete profile option in the dropdown options | The delete form is rendered, and if clicked, the user is deleted, logged out, and then redirected to the home page | PASS |
| Instructor applicaiton form | Access a self profile without instructor status and click the instructor icon displayed in the cyan button | The application form is successfully displayed, and when submitted, it closes | PASS |
| Instructor applicaiton feedback | After submitting the application form, try again to click that button | The form is not rendered, and a feedback message is displayed for the user to wait until the application is processed | PASS |
| Visit non-istructor profile | Access another user profile that does not have instructor status | All information of the user should be displayed, except for the instructor application and action buttons, and details of courses in enrollments, wish lists, or reviews | PASS |
| Visit istructor profile | Access another user profile with instructor status | All relevant information is displayed, the gold instructor icon is rendered, and the instructor courses are displayed below | PASS |

### Validator testing 

1. All CSS files passed teh [Jigsaw validator](https://jigsaw.w3.org/css-validator/) with no issues. The only errors/warnings raised where the Tailwind rules in the `index.css`. 

![CSSvalidation](/src/assets/images-readme/CSSValidator.png)

2. ESLINT stuff

3. The page has excellent ratings in best practices and SEO. However, performance and accessbility can be inproved by applying the following recommnedations: 

- Performances is affected due to the various CDNs such as React Bootstrap, Font Awseome and Google fonts. These could be replace by avoind CDN calls or even use other frameworks, such as [shadcn/ui](https://ui.shadcn.com/), where the components are written in TypeScript and live in the project itself. 
- Accessiblity can improved by having a better contrast ratio in the colors used. 

![lightHouseAssessment](/src/assets/images-readme/lightHouseAssessment.png)

4. Live website tested in Chrome, Safari and Mozila.

### Unfixed bugs
More than just bugs, I want to use this section to outline things that I would have done differently to avoid specific issues that I encountered during this project.

- Use flexible UI frameworks: Even though React Bootstrap is widely used in the industry, the lack of flexibility that the components have in terms of embedded JavaScript and CSS is significant. Overriding CSS styles requires a significant amount of work, and if the .module.css styling is used, it becomes even more complicated. Additionally, some components simply do not work, such as the accordion and hidden labels. This is the reason why I decided to implement the [shadcn/ui](https://ui.shadcn.com/) to implement the accordion, dropdown and the sheet component.
- Tailwind CSS: I only encountered Tailwind to use the [shadcn/ui](https://ui.shadcn.com/) components; however, when using it, I realized that even though Bootstrap classes help to add quick styling, it is significantly limited and inflexible. Tailwind provides a much larger amount of predefined classes, and when used in conjunction with the VS Code extension `Tailwind CSS IntelliSense`, it can streamline styling in complex React projects.
- Have a better understanding of technologies behind the UI libraries: [shadcn/ui](https://ui.shadcn.com/) components are flexible in terms of styling and behavior, but these components are written in TypeScript, a technology that I am not very familiar with. This lack of knowledge and understanding led to problems when deploying the application due to differences in versions and their application. However, thanks to the Code Institute Tutor support, I was able to successfully deploy the project.
- Check external libraries' dependencies: When I came across [shadcn/ui](https://ui.shadcn.com/), I jumped directly to installing them by following their detailed documentation. However, after the setup, I realized that these components are based on/come from [Radix](https://www.radix-ui.com/), another UI library that provides even more flexibility.


## Technologies used

### Programming languages
- HTML5
- CSS3
- JavaScript
- Python
- SQL - Postgres

### Frameworks, Libraries and programs used

- [Google Fonts](https://fonts.google.com/)
- [Font Awesome](https://fontawesome.com/)
- [Gitpod](https://www.gitpod.io/)
- [GitHub](https://www.gitpod.io/)
- [Am I responsive](https://ui.dev/amiresponsive)
- [Favicon](https://favicon.io/)
- [Django Rest](https://www.django-rest-framework.org/)
- [React-Bootstrap](https://react-bootstrap.github.io/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ReactJS](https://react.dev/)

## Components

Multiple components were used throughout this project with the capability of reusability to avoid repetitive tasks.

1. axiosDefaults.js: streamlined the API calls with the REST API.
2. Asset.js: mainly used to provide loading feedback to the client.
3. Avatar.js: used to display users' profile images in the reviews, profile pages, and navbar.
4. Dropdown.js: used to provide edit and delete actions for courses, reviews, and profiles.
5. Rating.js: The main focus of this project was to provide overall course ratings but also the rating of each review. This reusable component was key to displaying this information.
6. RatingInput.js: This component was used to interactively input the rating in a review. It is located in the CreateReviewForm.js and EditReviewForm.js.
7. useClickToggle.js: a component to hide the collapsible navbar elements when clicking anywhere else on the website.
8. useRedirect.js: a component to redirect logged-in users from the /auth URL.
9. CourseDisplay.js: even though this component is related to the courses page, it is used on the home page, courses page, and profile page to display courses depending on filtering and sorting props provided. 

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

4. TypeScript configurations: 

```
{
    "compilerOptions": {
        "target": "es2016", 
        "jsx": "react",
        "module": "commonjs",
        "baseUrl": "src",
        "paths": {
            "@/components/*": ["src/@/components/*"]
        },
        "esModuleInterop": true,
        "forceConsistentCasingInFileNames": true,
        "strict": true,  
        "skipLibCheck": true
    }
}
```

The key aspect here was to provide the correct `baseUrl` and paths to the components. Initially, the `@` folder was placed in the root directory, but then I moved it to the `src` directory where all the components are.

5. Tailwind configurations were taken from each of the components used from the [shadcn/ui](https://ui.shadcn.com/).  Each component has its own Tailwind documentation.

6. After all of these, just git add, commit and push the code to Github. 

7. Create an new app in Heroku, link the repository and deploy the branch.

### Connection with the API

The API connection is done in the in the Heroku variables of the [DRF-API](https://github.com/juanovt10/eduhub-drf-react). These variables are:

- Key: CLIENT_ORIGIN | Value: `deployed url`
- Key: CLIENT_ORIGIN_DEV | Value: `local host`

### Deployment to Heroku
1. In the package.json file under the scripts section add: 
```
"heroku-prebuild": "npm install -g serve",
```

2. Add Procfile in the root directory with the following contents: 
```
web: serve -s build
```

3. Git add, commit and push the changes to Github
4. Redeploy the application in Heroku under the deploy tab. 

## Credits

### Design
This website was inspired by various available LMS and reviews websites. The following were used for inspiration: 

- [LinkedIn Learning](https://learning.linkedin.com/)
- [Coursera](https://www.coursera.org/)
- [EdX](https://www.edx.org/)
- [TripAdvisor](https://www.tripadvisor.com/)

### Code



### Media
The logo imagery was sourced from a logo maker powered by AI, [My Free logo maker](https://myfreelogomaker.com/)

### Content
Due to the nature of the web application, the content is provided by the users rather than by the web administrator, unless the administrators create posts themselves. Therefore, I used [ChatGPT]((https://chat.openai.com/)) to generate random profiles, posts, and comments to be able to populate the website with realistic content