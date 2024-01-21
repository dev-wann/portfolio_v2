# Portfolio v2

Link: https://portfolio-dev-wann.vercel.app/

Second version of personal portfolio project.  
Used neumorphism design to give a soft and minimalistic impression.  
You can experience smooth transition effects all over the pages.  
  
My portfolio is responsive.  
You can access it with both of your pc and mobile.  
<br/>
<br/>

## # Pages

### HOME

Plays keyboard typing video with type writing effect.  
Shows smooth transition effect when theme / language / page changes.  
'SKIP' & 'REPLAY' button controls the video sequence.  
'ABOUT ME' button routes user to ABOUT page.  

![2024-01-21-11-14-53-image](https://github.com/dev-wann/portfolio_v2/assets/89072661/95b01d23-332c-410a-9a57-28ade5cbe244)

![2024-01-21-11-13-22-image](https://github.com/dev-wann/portfolio_v2/assets/89072661/7d293069-c7da-4377-bcec-dafb26e30a52)

<br/>

### ABOUT

Consists of 'About me', 'Skills', 'Experience', 'Education' sections.  

![2024-01-21-11-35-17-image](https://github.com/dev-wann/portfolio_v2/assets/89072661/7364687c-0c08-4880-a63c-54719fc958f1)

#### About me

Brief introduction of myself.  
You can see my resume and read more about my story by clicking the buttons.  

#### Skills

Show my development skills with a bento box style layout.  
Highlight mouse hovered box and dehighlight others.  

#### Experience

Show my professional experience.  
When each project is hovered, show period visually by the left slide bar and highlight it by font color.  

#### Education

Show my education information  

<br/>

### PROJECT

Consists of three items, 'Portfolio Page', 'SuperOffice', 'ToOffice', and a hidden item 'Coming Soon...'.  

Hidden item is the first item of this page.  
However, the page is forced to scroll to the second item when it is loaded, which gives the first item hidden-like effect.  

![2024-01-21-12-33-19-image](https://github.com/dev-wann/portfolio_v2/assets/89072661/1e6617df-67c5-4fdc-af60-01a5f2110977)

<br/>

### Contact

Contact page consists of two part.  

The first part, or the left side, is the buttons of my email, linkedin, github, blog, and instagram.  

The second part, or the right side, is a direct message feature implemented with nodemailer.  
It delivers the message to me by my email, and then gives the user auto-reply email.  

![2024-01-21-12-39-04-image](https://github.com/dev-wann/portfolio_v2/assets/89072661/047f4fe5-a909-4f9b-802c-359c2a0c4da9)

<br/>


### Resume

Show my resume with smooth transition effect.  
You can download it or print it with the buttons on the upper right of my email.  

![2024-01-21-12-42-26-image](https://github.com/dev-wann/portfolio_v2/assets/89072661/18fa2c94-dc55-4ff1-92eb-a4be64aac09d)

<br/><br/>


## # Features

### Theme

You can select between light and dark theme by clicking the sun or moon icon in the navigation bar.  

![2024-01-21-13-05-11-image](https://github.com/dev-wann/portfolio_v2/assets/89072661/54b1478b-2422-45a1-a1dc-028d312a5a01)

![2024-01-21-13-05-02-image](https://github.com/dev-wann/portfolio_v2/assets/89072661/2c91537e-546d-402f-9efa-ca0176c4d1a8)

<br/>


### Language

You can select between English and Korean languages by clicking the ( ENG / KOR ) toggle button in the navigation bar.

![2024-01-21-13-06-57-image](https://github.com/dev-wann/portfolio_v2/assets/89072661/54a4b442-1277-4849-bba4-07b5d1218e03)

![2024-01-21-13-07-10-image](https://github.com/dev-wann/portfolio_v2/assets/89072661/a73e9698-3236-423d-8bed-94f2f0f83d23)

<br/>

<br />

## # State Management

### HOME Stage

HOME related states are controlled by the 'homeStageSlice.tsx'

#### States:

- stage: stage of home video

- videoType: type of video for current stage. \${theme}-\${stage} format string.

- isStageFinished: flag to trigger next stage

- isProcessing: flag to block duplicated requests

- isLowPowerMode: flag to handle low power mode fallback

#### There are 6 stages in the home video:

- idle: initial stage when page is loaded.

- ready: stage for loading videos.

- opening: play typing video with typing effect of 'Hello' string. shows 'SKIP' & 'ABOUT ME' buttons.

- main: keep play video and show typing effect.

- pending: stop the video and change 'SKIP' button to 'REPLAY'.

- closing: play closing video and smoothly remove everything in the screen.

#### Behavior

When page is loaded, stage automatically proceeds from idle to pending.
When SKIP button is pressed, current stage stops and changes into pending.
When REPLAY button is pressed, closing stage is played and ready stage starts again.
When theme / language / page changes, current stage stops and closing stage is played before change.

#### How it works

1. A React component or hook requests stage change by calling one of ‘changeStageTo’ and ‘changeStageAndPlay’ thunks

2. each thunk executes proper stage preparation for each stage (by calling prepareStage method in stageUtil) and change stage state in homeStageSlice

3. after stage state changed, appropriate logics for each stage is executed (play video or loading data) and change the isStageFinished state to true

4. change of isStageFinished state triggers next stage to start (/app/page.tsx)

<br />

### User Preference (Theme & Language)

Theme and language state is managed by the 'preferSlice'
Each preference has two version of reducers, a normal one and a thunk for delayed preference change (for HOME).

#### Normal Reducers

Preference states are saved to localStorage after each change.
They are used to remember the last selected preferences and provide it at the next visit.

#### Thunks

Thunks are for closing stage of HOME page.
When the client requests preference change at HOME, the page needs to wait until the closing sequence ends.
Therefore, each thunk waits for a certain delay time(the length of closing video) and then change the preference.

<br />

### Low Power Mode

If the mobile device is in low power mode, videos will never gonna be able to play.
Therefore, it is necessary to detect low power mode and show fallback

#### Detect low power mode

There's no way to directly detect the low power mode.
I just played a dummy video and if it is not playable(=== throws error), I just assumed it to be low power mode.
Check 'LowBatteryModeDetector.tsx' for detecting codes.

#### Show fallback

When it is turned out to be low battery mode, I presented a fallback image and a message to turn off the low battery mode.
You can find the fallback code at 'BackgroundVideo.tsx'.<br/>
<br/><img src="https://github.com/dev-wann/portfolio_v2/assets/89072661/790adc18-6c48-45a1-be13-69a2ee1b6656" width=400><br/>
<br/>
<br/>

2024.01.21  
Seungwan Cho  
swcho8220@gmail.com  
