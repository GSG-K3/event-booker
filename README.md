# Event Booker 

[Figma Design](https://www.figma.com/file/1TG0gAAmL4qvqlhIlieYv1/event-booker?node-id=0%3A1&viewport=1114%2C1177%2C0.09017345309257507)

[Event Booke Site](https://event-booker.herokuapp.com/)

## Proplem
GSG Create Events Frequent , and the members of event in some time up to hundred, GSG logistics and operations admin using 4 ipads to the registration Newcomers , and take attendance.

Newcomers will need to log in their info; name, age, profession/university, location and phone number into the GSG system at the door when they come in. But once they’re in the co-working space and at their event, they need to fill in another google form that logs them in using their phone numbers as attendees for this specific event. This entire process makes GSG logistics and operations admin  feels the annoyance resulting from it by the attendees as it can distract them from focusing on the content of the event that’s being presented, and add a lot to the noise that may come as a result of moving the ipads around and asking individuals if they’ve logged their info, over and over again. 

## Solution
Create WebSite where events attendees can register for one or more events, and enter their info. Also they can sing up if they register for the first time or login.  The website sends a code for each attendee to approve his attendance in the event.

##  User Journey

![user jerny](https://user-images.githubusercontent.com/7718220/79892228-e3867280-840a-11ea-9081-6e5a4807752c.png)


## user story:
  ### As User
    1. As A user i can access the app and view the available events at GSG
    2. As a user I can view all event relate to their programs
    3. As a user i can see all details about any event 
    4. As a user i can register any available event
    5. as a user i should signup or login to register any available event
    6. As a user i can cancel my registration
    7. As a user i will get a code on my email / event page
    8. As a user I can use the code to improve my attendance when I attend the event
    9. as a user i can view my profile and update my info
    10. as a user i can logout from the app
   
---

  ### As Admin  
    11. as a admin i can login to the system
    12. as a admin i can add new event
    13. as a admin i can update / delete upcoming event
    14 .as a admin i can take attendanc (by taking the code)
    15. as a admin i can add users
    
 ## Database schema   
   ![_Entity Relationship Diagram Example (UML Notation) (1)](https://user-images.githubusercontent.com/7718220/79893024-1f6e0780-840c-11ea-88a0-d9416adf58e3.png)
   
 ## Setup the project 
 To setup the app locally follow these steps :

 - Git clone event-booker repo : `git clone`
 - Install node modules for client side and server side : `npm i`
 - run this command to run the project : `npm run dev`
 
 ## Team Members: 
 - [Yakoob](https://github.com/YakoobHammouri)
 - [Sahar](https://github.com/SaharFroukh)
 - [Ruba](https://github.com/rubasider)
