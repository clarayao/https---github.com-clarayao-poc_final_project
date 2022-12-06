# Politics of Code Final Project
### Inspiration & Concept
Inspired by the “[Privacy Analyzer](https://privacy.net/analyzer/)”, a website that exposes users to exploitation of information that web browsers deploy, 
I was very much intrigued by this phenomenon. Often ignored, digital technologies, including web browsers, social media, and even cameras on the street, 
are always extracting information and data from us, study our behaviors based on these data, and even use these analyses to further change our behaviors. 
Thus, inspired by these concepts, I created this website that analyzes and assumes the users’ interests based on their interactions to the elements on the
website.

### Interaction
This website consists of mainly three parts: 
1. Interactive elements including images and video
   * The images on the right hand side each represents an interest category. These categories are based on Facebook’s categorization of users’ interests. Whenever the user hovers and stays in the boundaries of one of the images, the estimated interest value of this category will accumulate and the user will be assumed to be more interested in this category. The interest value from the images are set as 70% of the total interests.
   * The video on the left hand side utilizes ml5.js to detect the users’ facial expression (smiling/satisfied or not/unsatisfied). The facial expression is determined by whether the average value of the upper and lower lip’s position is higher or lower than the average value of the corner of the mouth. When the facial expression of the user is determined as smiling (satisfied) and the user is hovering on one of the images on the right, the interest value of this category will also rise proportionally, as the interest value for the facial expression takes up 30% of the total interest value.
2. The user profile built based on the users actions
   * The final output interest value is calculated by having 70% of the value accumulated based on the time that user hovers on each of the images, and 30% of the value accumulated based on the facial expression that the user was having when hovering on each of the images.
   * Then on the left hand side of the website, the estimated interest category is displayed with text. At the same time, some images are displayed as “recommendations” based on the interest category. These images are deprived from the subcategories of each of the main categories in Facebook’s interest list.
3. Elements indicating the surveillance of the website
   * There’s an arrow that turns and points to the direction of the mouse.
   * There’s also a section that displays how long the user has stayed idle.

Therefore, this project to some extent intends to reveal a simplified version of how websites or social media platforms might identify and see you as someone you don’t necessarily agree with based on your interactions with them.

### Technology & Aesthetics
This project mainly uses plain javascript and some ml5.js and p5.js. 

As discussed above, the video portion uses the “face API” in ml5.js to recognize the parts of the user’s face which would then determine the facial expressions of the user. However, the way that I defined the user’s facial expressions is not very accurate and scientific because it solely relies on the comparison of the positions of different parts of the user’s mouth. It also uses some p5.js to draw out the video.

For the section where the arrow turns according to the position of the user’s mouse, I also used p5.js to accomplish the interaction.

For the rest of the parts, including the layout of the images, the calculation of different values, and the changes of the texts are all achieved by javascript, css, and html code.


For the aesthetics, the whole page imitates the aesthetic and layout of Facebook as it is one of the most influential and controversial social media platforms. It’s also why I used its interest categories as the basis. By imitating its aesthetic, I wanted the website’s aesthetics to be consistent with its contents. 

To achieve such aesthetics, I use the colors that Facebook uses, and add the similar hovering effect where those sections turn to darker shades of grays. I also used similar fonts and made a similar logo to make it look more like Facebook’s UI.
