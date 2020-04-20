## user Home Page 
    logo comp
    event tab
    event card


## user event details Page
    logo Comp
    event  data
    take place

## sing up Page
    logo 
    sing up form 

## sing in Page
    logo 
    log in form


## profile Page
    avatar "Profile Image"
    profile tab : 
        1.info 
           info user 
        2. Events 
           event of user
        3. setting 
           chage password

## admin home page 
    admin menu
    avatar "Profile Image" 
    event in day 

## admin take Attendance Page
    admin menu
    event data 
    member Attendance in  event 



## admin new Event Page
    admin menu
    avatar "Profile Image" 
    Add Event Form 



## admin Events Page 
    admin menu
    avatar "Profile Image"
    event tab
    event card
    action event "edit , delete"

## admin Event Detail Page
    admin menu
    avatar "Profile Image"
    event data
    member Attendance in  event 


## user not login  menu contains :   
    1. login
    2. sigup
    3. contact us
   
   
   
## user login menu contains : 
    1.profile
    2.events 
    3.contactus
    4.logout
    
   
## admin login menu contains :
       1.new Event 
       2.new Member
       3.logout 

## common component : 
    logo comp
    event tab
    event card
    avatar "Profile Image"
    menu
    member Attendance in  event


## browser Endpoint 
Admin : 

    home : /admin/

    newEvent : /admin/NewEvent

    newMember : /admin/NewMember

    Take Attendance : /admin/Event/takeAttendance/:id "/admin/Event/5"

    Events : /admin/Events/

    Event Details : /admin/Event/Detail/:id "/admin/Event/5"

user : 

    home : /
    
    Singup : /user/Singup
    
    Login : /user/login
    
    event details : /event/id
    
    profile : /user/profile/userName

## Database:
   ### Table

        1. user
        2. event
        3. user-event
    

![Entity_Relationship_Diagram_Example_UML_Notation_1](https://user-images.githubusercontent.com/47992412/79761058-a39b8e80-8329-11ea-8a3d-8166b3aaf1e3.png)

