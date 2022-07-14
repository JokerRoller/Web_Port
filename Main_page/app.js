// Selectors
var startBtn = document.querySelector('.btn1');
var about = document.querySelector('.about_li');
var contact = document.querySelector('.contact_li');
var projects = document.querySelector('.project_li');
var sectionProject = document.querySelector('.project');
var sectionAboutMe = document.querySelector('.about_me');
var sectionContact = document.querySelector('.contact');
// Event listeners
startBtn.addEventListener('click', start);
about.addEventListener('click', color);
contact.addEventListener('click', color);
projects.addEventListener('click', color);
// Functions
// scrolls down the page on btn press
function start () {
    window.scroll({
        top: 5000,
        behavior: 'smooth'
      });
}
// change color of chosen page
function color(e) {
    let tag = e.target
    about.classList.remove('active');
    contact.classList.remove('active');
    projects.classList.remove('active');
    tag.classList.add('active');
    if (tag.classList.contains('project_li')) {
        tinyProjects();
    } else if (tag.classList.contains('about_li')) {
        aboutMe();
    } else {
        contactF()
    }
}

function aboutMe(){
    sectionProject.classList.remove('active_display');
    sectionAboutMe.classList.remove('active_display');
    sectionContact.classList.remove('active_display');
    sectionAboutMe.classList.add('active_display')
}
function tinyProjects(){
    sectionProject.classList.remove('active_display');
    sectionAboutMe.classList.remove('active_display');
    sectionContact.classList.remove('active_display');
    sectionProject.classList.add('active_display')
}
function contactF(){
    sectionProject.classList.remove('active_display');
    sectionAboutMe.classList.remove('active_display');
    sectionContact.classList.remove('active_display');
    sectionContact.classList.add('active_display')
}
 