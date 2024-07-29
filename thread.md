### Threads --> ###

                     
# Steps -->

1.  *Installations* --> 
    - `npx create-next-app@latest ./` - to create next app in current working directory.
    - Tailwind     - `Yes`
    - Eslint       - `No`
    - Typescript   - `Yes`
    - sr/directory - `No`
    - App Router   - `Yes`
    - import alias - `No`

    *Additional Dependencies* -- >
    - `npm i @clerk/nextjs`       - to authenticate and manage your users.
                                  - Clerk is a complete suite of embeddable UIs, flexible APIs, and admin dashboards to authenticate and manage your users.

    - `npm i @clerk/themes`       - for dark mode

    - `npm i @uploadthing/react`  - to upload profile  images.
    - `npm i uploadthing`

    - `npm i mongoose`            - for database 

    - `npm i svix`                - for webhooks

    - `npm i tailwindcss_animate` - for tailwind animations

    - `npx shadcn-ui@latest init` - for predesigned components can be changed by tailwind.
                                  - for complete shadcn ui [not required just install whats required. Ex -`npx shadcn-ui@latest add input` - for input]

2. *Overview* -->
   - `app` folder contains our complete Next app.
   - Remove everything from `page.tsx`.
   - Copy styles from `global.css` in github link provided, and them in your `globals.css`. It contains basic  tailwind css for making our application.
   - Now since we are using custom classes, we need to define it in tailwind for which open `tailwind.config.js` and paste complete code from github link provided.

3. *Folder Structure* -->
   -  We will be using route groups for our application.
   - `Route groups`  - In the app directory, nested folders are normally mapped to URL paths. 
                   - However, you can mark a folder as a Route Group to prevent the folder from being included in the route's URL path.

                   Route groups are useful for:
                   - Organizing routes into groups e.g. by site section, intent, or team.
                   - Enabling nested layouts in the same route segment level:
                     1. Creating multiple nested layouts in the same segment, including multiple root layouts
                     2. Adding a layout to a subset of routes in a common segment.
                  
                   - To organize routes without affecting the URL, create a group to keep related routes together. The folders in `parenthesis` will be omitted from the URL (e.g. (marketing) or (shop)).

  - (auth) - contains auth routes
  - (root) - contains other routes
  - Move current page[`page.tsx`] and its layout [`layout.tsx`] inside `root` folder.

4. *Auth Routing* -->


   ### Step 1 -> Creating layout for auth pages -->
   - Create new folder - `sign-up`   - for singleup page
                       - `sign-in`   - for login page
                       - `onboaring` - for profile area where user can enter additional information.  

   -  Create a file `layout.tsx` to define layout rules for our authentication purposes.

   - **For better SEO** - 
     ```
      export const metadata = {
           title : 'Threads',
           description: ' A Next.js 14 Meta Threads Application'
      }
      <!-- Now immediately export our function -->
      const inter = Inter({subsets:["latin"]});
      export default function RootLayout({
          children
      }:{
          children : React.ReactNode
      }){
          return(
              <ClerkProvider>
                  <html lang="en">
                      <body className={`${inter.className} bg-dark-1`}>
                          {children}
                      </body>
                  </html>
              </ClerkProvider>
          )
      }
     ```
     - Our function RootLayout accepts children as props which has type of ReactNode [defining type because we are using typescript].
     - Our function returns something wrapped in <ClerkProvider><ClerkProvider/>. This allows us to use all clerk's functionality which we have to import from `import { ClerkProvider } from "@clerk/nextjs";`
     - Inside ClerkProvider we provide our html page with body tag have className `bg-dark-1` which renders our children
     - We can provide google fonts into our project using 
       `const inter = Inter({subsets:["latin"]});` which comes from `import { Inter } from "next/font/google";` which can be used as `${inter.className}`.
   
   ### Step 2 -> Creating account on CLerk --> 
   
    - We have to create an account on Clerk.com
    - Go to https://clerk.com/
    - Signup
    - Add application, enter name
    - Choose how you want users to sign in
    - Create Application
    - Create and Copy the `Publisher key` and `Secret key` in `.env.local` file.
    - On the users tab, you can see all the users who have signed in to your application.
    - We need to enable `Organizations` because we want to create communities in our application.
    - Toggle `Enable Organization` in `Organization Settings` and apply changes.
    - Check Out the documentation of clerk for NextJS.
    
   ### Step 3 -> Protecting our application -->
       [which files to hide behind authenticaion]

    - for this we create a file `middleware.ts` in root folder, copy the code from the documentation

    ```
      import { authMiddleware } from "@clerk/nextjs";
       export default authMiddleware({
           publicRoutes : ['/', '/api/webhook/clerk'],
           ignoredRoutes : ['/api/webhook/clerk']
       });
       export const config = {
         matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
       };
    ```
    - After this our pages are protected and if someone tries to access the page without being authenticated, they will be redirected to the sign up page.
     
   ### Step 4 -> Building sign-in and sign-up pages -->

    *for sign-up page -->*
    - Create a file in `app/sign-up/[[...sign-up]]/page.tsx` with exact path to use Clerk's signup compoenents and paste code from the documentation. 
    `https://clerk.com/docs/references/nextjs/custom-signup-signin-pages#build-your-own-sign-in-and-sign-up-pages-for-your-next-js-app-with-clerk`

    ```
      import { SignUp } from "@clerk/nextjs";
       
      export default function Page() {
        return <SignUp />;
      }
    ```

    *for sign-in page -->*
    `app/sign-in/[[...sign-in]]/page.tsx`
    ```
      import { SignIn } from "@clerk/nextjs";
      export default function Page() {
          return <SignIn />;
      }
    ```

    *Update Environment variables in .env.local file*
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/


4. *Home Page* -->

   ### Step 1 -> Create layout of our Home page inside `layout.tsx` file -->
    
    - In our home page, we will have `TopBar`, `LeftSidebar`, `RightSidebar` and `Bottombar`.
    - Open `layout.tsx` file, and instead of children, create 4 components inside body. Put LeftSidebar and RightSidebar inside a main tag as it will contain main components of our application and provide specified classes.
    - Inside main between left and rightsidebar will come our section displaying all the children.
    - Bottombar will only be visible to tablet and phone users.
    - Similarily, LeftSidebar and RightSidebar will be visible to desktop and tablet users only.

    ```
       export default function RootLayout({
         children,
       }: Readonly<{
         children: React.ReactNode;
       }>) {
         return (
           <ClerkProvider>
             <html lang="en">
               <body className={inter.className}>
                 <Topbar/>
                 <main className="flex flex-row">
                   <LeftSidebar/>
                   <section className="main-container">
                     <div className="w-full max-w-4xl">
                       {children}
                     </div>
                   </section>
                   <RightSidebar/>
                 </main>
                 <Bottombar/>
               </body>
             </html>
           </ClerkProvider>
         );
       }
    ``` 

   ### Step 2 -> Create `TopBar`, `LeftSidebar`, `RightSidebar` and `Bottombar` components -->

   - Create a folder `Components` outside the app folder as app folder only contains files and folders which are to be rendered our home page.
   - And NextJS supports `File Based Routing`.
   - Create a folder `Shared` inside the `Components` folder.
   - Create files `TopBar.tsx`, `LeftSidebar.tsx`, `RightSidebar.tsx` and `Bottombar.tsx` inside the `Shared` folder.

   *Topbar.tsx -->*
   - Our topbar will have a Logo, Heading and a Signout button.
   - It will also contain Profile Icon 

    ```
     import {SignedIn, SignOutButton, OrganizationSwitcher } from "@clerk/nextjs";
     import Image from "next/image";
     import Link from "next/link";
     import {dark} from "@clerk/themes"
     
     function Topbar() {
       return (
         <nav className='topbar'>
           <Link href='/' className='flex items-center gap-4'>
             <Image src='/assets/logo.svg' alt='logo' width={28} height={28} />
             <p className='text-heading3-bold text-light-1 max-xs:hidden'>Threads</p>
           </Link>
     
           <div className='flex items-center gap-1'>
           <!-- sign-out button will be hidden for devices like desktop will be shifted in bottom of left side bar-->
             <div className='block md:hidden'> 
             <!-- Special Component provided by clerk which is used to show things for signed in users. -->
               <SignedIn>
                 <SignOutButton>
                   <div className='flex cursor-pointer'>
                     <Image
                       src='/assets/logout.svg'
                       alt='logout'
                       width={24}
                       height={24}
                     />
                   </div>
                 </SignOutButton>
               </SignedIn>
             </div>

            <!--  Special Component provided by clerk which isUsed to Show Profile icon where we can see users profile or create a organisation(community) -->
             <OrganizationSwitcher
               appearance={{
                <!-- changing clerk's theme using "@clerk/themes"-->
                 baseTheme: dark,  
                 elements: {
                   organizationSwitcherTrigger: "py-2 px-4",
                 },
               }}
             />
           </div>
         </nav>
       );
     }
     
     export default Topbar;
   ```

   *LeftSidebar.tsx -->*
   - Our left side bar will contain `Home`, `Search`, `HActivity`, `Create Thread`, `Communities` and  `Profile`.
   - Since there are too many things we can create an array of objects `sidebarLinks` and import it from `index.js` file in folder `constants` in root folder.
   - Get it from source code of this project.
   - We can display all objects using map function of arrays.
   - Whenever a link is active, we need to highlight that icon. For this we require path name of currently active link which we can get from `usePathname` hook from nextjs.
   - We need `useRouter` hook to change route to sign-in as soon as user presses the sign-out button.
   - For this we need to import `usePathname` hook from `next/navigation` and `useRouter` hook from `next/router`.
   - Since `useRouter` hook works only for Client Components we need to add a declaration at top of file `use client`.

   ```
   "use client"
     import {sidebarLinks} from "@/constants";
     import Link from "next/link";
     import Image from "next/image";
     import { usePathname, useRouter } from "next/navigation";
     import { SignOutButton, SignedIn } from "@clerk/nextjs";
     function LeftSidebar(){
         const router = useRouter();
         const pathname = usePathname();
         return(
             <section className="custom-scroller leftsidebar">
                 <div className="flex w-full flex-1 flex-col gap-6 px-6">
                     {sidebarLinks.map((link) => {
                         return (
                             const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
                             <Link 
                              href={link.route} 
                              key={link.label} 
                              className={`leftsidebar_link $ {
                                 isActive && 'bg-primary-500'}`}
                             >
                                 <Image 
                                  src={link.imgURL}
                                  alt={link.label}
                                  width={24}
                                  height={24}
                                 />
                                 <p className="text-light-1 max-lg:hidden">{link.label}</p>
                             </Link>
                         )
                     })}
                 </div>
                 <div className="mt-10 px-6">
                   <SignedIn>
                     <SignOutButton signOutCallback = {() => router.push('/sign-in')}>
                       <div className='flex cursor-pointer gap-4 p-4'>
                         <Image
                           src='/assets/logout.svg'
                           alt='logout'
                           width={24}
                           height={24}
                         />
                         <p className="text-light-2 max-lg:hidden">Logout</p>
                       </div>
                     </SignOutButton>
                   </SignedIn>
                 </div>
             </section>
         )
     }
     export default LeftSidebar;
   ```

    *Bottombar.tsx -->*
    - Bottom Bar will only be used for mobile navigation , which will contain all links of leftsidebar.

    ```
      "use client"
      import {sidebarLinks} from "@/constants";
      import Link from "next/link";
      import Image from "next/image";
      import { usePathname } from "next/navigation";
      function Bottombar(){
          const pathname = usePathname();
          return (
              <section className="bottombar">
                  <div className="bottombar_container">
                      {sidebarLinks.map((link) => {
                          return (
                              <Link 
                               href={link.route} 
                               key={link.label} 
                               className={`bottombar_link $ {
                                  isActive && 'bg-primary-500'}`}
                              >
                                  <Image 
                                   src={link.imgURL}
                                   alt={link.label}
                                   width={24}
                                   height={24}
                                  />
                                  <!-- Show the link name for devices of size tablet , there will be no space for name for mobile phones -->
                                  <!-- Futher using split function of string to show just first label of respective link to avid overlapping -->
                                  <p className="text-subtle-medium text-light-1 max-sm:hidden">{link.label.split(/\s+/)[0]}</p>
                              </Link>
                          )
                      })}
                  </div>
              </section>
          )
       }
      export default Bottombar;
    ```

    *RightSidebar.tsx -->*
    - Right Side bar will contain Suggested Communities and Suggested Users for respective user.

    ```
    function RightSidebar(){
       return (
          <section className="custom-scrollbar rightsidebar">
             <div className="flex flex-1 flex-col justify-start">
                <h3 className="text-heading4-medium text-light-1">Suggested Communities</h3>
             </div>
             <div className="flex flex-1 flex-col justify-start">
                <h3 className="text-heading4-medium text-light-1">Suggested Users</h3>
             </div>
          </section>
       )
    }
    export default RightSidebar;
    ```

5. *Onboarding Process* -->
   - Onboarding process is the very first user onboarding experience of an entire onboarding process, often in the form of signup forms, core feature user checklists, and other key feature onboarding elements.
   - It is like a profile area where user fills his/her basic details.

   ### Step 1 -> Create `page.tsx` file which will show onboarding page -->

     - Open `page.tsx` inside `Onboarding` folder inside (auth).
     - Create a heading and little description
     - We dont have to do make everything that has to do with users or authentication. We get everything from clerk.
     - Clerk provide something called `currentUser` that contains all the information about current user.
     - Make a  component AccountProfile, where we will pass userdata from `currentUser` to display in onboarding page and a button to `continue`.
     - In page.tsx, create a object `user` which will store info about signed in user.
     - Object `userInfo` will contain info of currently signed user from Database. [will be working on it afterwards]
     - A object `userData` which will contain info about user [id, object id, username, bio and image] which is to be displayed in Onboarding page.
     
     `page.tsx` -->
     ```
       import AccountProfile from "@/components/forms/AccountProfile";
       import { currentUser } from "@clerk/nextjs";
       async function Page(){
           const user = await currentUser();
           const userInfo = {};
           const userData = {
               id : user?.id,
               objectId : userInfo?._id,
               username : userInfo?.username || user?.username,
               name : userInfo?.name || user?.firstName || "",
               bio : userInfo?.bio || "",
               image : userInfo?.image || user?.imageUrl,
           }
           return(
               <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
                   <h1 className="head-text">Onboarding</h1>
                   <p className="mt-3 text-base-regular text-light-2">Complete your profile now to use Threads</p>
                   <section className="mt-9 bg-dark-2 p-10">
                       <AccountProfile user={userData} btnTitle="Continue"/>
                   </section>            
               </main>
           )
       }
       export default Page;
     ```

   ### Step 2 -> Create a file `AccountProfile.tsx` returning the AccountProfile component -->

     - Accountprofile component will accept `user` and `btnTitle` props.
     - So, we will create a Props interface containing `user` which will contain `id`, `objectId`, `username`, `name`, `bio`, `image` and `btntitle` of type string.
       ```
         interface Props{
           user : {
             id : string;
             objectId : string;
             username : string;
             name : string;
             bio : string;
             image : string;
           };
           btnTitle : string;
         }
       ```
  
     - Now, we will account profile structure.
     - For this, we will be using shadcn designed components which can be used and customized.
     - Go to Components -> Form
     - As you can see, shadcn uses React Hook Form and Zod.
     - We now cannot use shadcn directly, firstly we need to initialise shadcn using `npx shadcn-ui@latest init`.
          - TypeSceript - Yes
          - Style       - Default
          - Color - Slate
          - Global css file - app/global.css
          - CSS variables - No
          - Tailwind config - ..tailwind.js
          - React Server Components - Yes
          - For Rest everything press enter.
          - This will create a new file `components.json` containing everything required for using shadcn.
  
     - for form     - `npx shadcn-ui@latest add form`
     - for input    - `npx shadcn-ui@latest add input`
     - for textarea - `npx shadcn-ui@latest add textarea`
     - We can see inside ui folder, containing `form.tsx`, `input.tsx`, `textarea.tsx`, `label.tsx` and `button.tsx`.
     
     - We can use form by importing it from `ui/form.tsx`.
     - Now, a form contains some default values like username, profile photo if available, bio etc. For this create a object from which will use `useForm` which comes from `React Hook Form`. This `useForm` will take a resolver which uses `zodResolver` for `user validation` and will contain default values coming from user like image, name, username, bio, if no value pass a empty string.
     - `Zod - TypeScript-first schema validation with static type inference.`
  
     ```
       import { useForm } from "react-hook-form";
       import {zodResolver} from '@hookform/resolvers/zod';
       import { UserValidation } from "@/lib/validations/user";
       const form = useForm({
         resolver: zodResolver(UserValidation),
         defaultValues : {
           profile_photo : user?.image || "",
           name: user?.name || "",
           username : user?.username || "",
           bio : user?.bio || "",
         }
       })
     ```
     
     - Now, you will get a error 
     `Unhandled Runtime Error : Invalid src prop.`
     `hostname "img.clerk.com" is not configured under images in your 'next.config.js'`
     - This is because clerk immediatedly after user sign-in gets profile image and other details from google profile to display. But nextjs protects us from other apps displaying anything in our app. So we need to add `images` in `next.config.js` which has array of objects remotePatterns and each object has a protocol and hostname to get image for google account so that clerk or other app can display it.
     ```
      const nextConfig = {
          images: {
           remotePatterns: [
             {
               // to get image for google account so that clerk can display it.
               protocol: "https",
               hostname: "img.clerk.com", //allowing images from clerk 
             },
           ]
          }
      }
      ```
    - We also need to set serverActions true and set server components external packages to mongoose for our application to understand mongoose actions.
     ```
        const nextConfig = {
            experimental: {
              serverActions: true,
              // for mongoose to work
              serverComponentsExternalPackages: ["mongoose"],
            },
        }
     ```
     - Copy the next.config.js from repository for all protocols we will be needing in our application.


   ### Step 3 -> Create a file `user.ts` inside validations inside lib folder containing schema for form -->

     - Now, we need to create our user validation which will be used by zod for validations.
     - Create a file `user.ts` inside validations inside lib folder. This is the schema for our form.
     - Now, create a UserValidation object which will have all the validations.
         - profile photo - should have a url which is non-empty
         - name          - is a string minimum 3 words, and maximum let say 30, same for username.
         - bio           - can range frm 3 to 1000 and is a string.
      ```
         import * as z from 'zod';
         export const UserValidation = z.object({
             profile_photo : z.string().url().nonempty(),
             name: z.string().min(3).max(30),
             username : z.string().min(3).max(30),
             bio : z.string().min(3).max(1000),
         });
      ```

   ### Step 4 -> Create a form in `AccountProfile.tsx` -->
    
     - Now create a form containing onSubmit function and required classes for styling.
     - The onsubmit function which will use zod for validation for form inputs.
     - Inside form we will create FormField for `profile image`, `name`, `username` and `bio`.


     *For Profile Image -->*
     - Create a FormField for profile image.
     - Now, if we have a profile image we can display it from `field.value` or else we can display a default image.
     - We will also make a form control to upload a new image. The image is `file`, which can be any type of imgae ,i.e., `image/*`. 

     - Now, we know clerk will get user profile image and other details from google account but all users dont sign-in with google so we need to add a way for them to update profile picture.
     - For images we will create a array of files, and set images using `useState`.
     - The form will have a onChange event to update the image. Since react hook form return nothing we get value automatically thus return type is void.
     - For preventing reloading we can prevent default of form.
     - We will use FileReader to read a image.
     - If we have a files and files length is greater than 0, then we get file, setFile in image array.
     - After that we check if the file is image or not.
     - If the file is image, then we get the url of the image and change the field of image with given image url. Lastly we read file as data url. This will help us to update the image.
            ```
              const [files, setFiles] = useState<File[]>([]);
              const handleImage = (e : ChangeEvent<HTMLInputElement>, fieldChange : (value:string) => void) => {
                e.preventDefault();
                const fileReader = new FileReader();
                if(e.target.files && e.target.files.length > 0){
                  const file = e.target.files[0];
                  setFiles(Array.from(e.target.files));
                  if(!file.type.includes('image')) return ;
                  fileReader.onload = async(event) => {
                    const imageDataUrl = event.target?.result?.toString() || '';
                    fieldChange(imageDataUrl);
                  }
                  fileReader.readAsDataURL(file);
                }
              } 
            ```
            ```
              <FormField
                control={form.control}
                name="profile_photo"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <FormLabel className="account-form_image-label">
                      {field.value ? (
                        <Image
                          src={field.value}
                          alt="profile photo"
                          width={96}
                          height={96}
                          priority
                          className="rounded-full object-contain"
                        />
                      ):(
                        <Image
                          src="/assets/profile.svg"
                          alt="profile photo"
                          width={24}
                          height={24}
                          priority
                          className="object-contain"
                        />
                      )
                      }
                    </FormLabel>
                    <FormControl className="flex-1 text-base-semibold text-gray-200">
                      <Input 
                        type="file"
                        accept="image/*"   // accepts image of all types
                        placeholder="Upload a photo"
                        className="account-form_image-input"
                        onChange={(e) => handleImage(e, field.onChange)} 
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ```

     *For Name -->*
     - A form field with name and label of `name` with a Input field to enter name.
            ```
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full gap-3">
                    <FormLabel className="text-base-semibold text-light-2">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="text"
                        className="account-form_input no-focus"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ```

     *For username -->*
     - A form field with name and label of `username` with a Input field to enter username.
            ```
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full gap-3">
                    <FormLabel className="text-base-semibold text-light-2">
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="text"
                        className="account-form_input no-focus"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ```

    *For Bio -->*
     - A form field with name and label of `bio` with a Input field to enter bio with 10 rows should be enough.
            ```
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full gap-3">
                    <FormLabel className="text-base-semibold text-light-2">
                      Bio
                    </FormLabel>
                    <FormControl>
                      <Textarea 
                        rows={10}
                        className="account-form_input no-focus"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ```
    - A button to submit form.
    - If styles are not being appiled, then shadcn must have modified the `globals.css `and `tailwind.config.ts` file. Copy the modified code from the repository for both files.
    
    - Our form has a onsubmit event handler, to update the form.
    - The onsubmit is a async function which performs valiadtion user UserValidation in user.ts with help of zod.
    - Next we get the profile photo from values attribute of form.
    - Now, we only update the form if details like image are changed, so we check if the image is a base 64 image and is changed or not.
    - Now, we use a function `isBase64Image` which is defined in utils.js. This function checks if the given string is a base 64 image or not. Copy the modified util.ts file for all necesary utiltity function used in our application.

    - Now, if the image is changed, then we use `Upload Thing` to change our image.
    - For this open up the documentation of Uploadthing `https://docs.uploadthing.com/getting-started/appdir`.
       - ***Step 1 - Creating your first FileRoute ***
                  All files uploaded to uploadthing are associated with a FileRoute. Think of a FileRoute similar to an endpoint, it has:
                    - Permitted types ["image", "video", etc]
                    - Max file size
                    - (Optional) middleware to authenticate and tag requests
                    - onUploadComplete callback for when uploads are completed

                    - Create a file core.ts with path `app/api/uploadthing/core.ts`.
                    - Copy the code from documentation.
                    - Change the following requirements:
                       a. We will be getting currentUser from clerk itself.
                       b. We will have maxfilecount as 1.
                    - Rest everything is same as in documentation. 

                    ```
                      import { currentUser } from "@clerk/nextjs";
                      import { createUploadthing, type FileRouter } from "uploadthing/next";
                      const f = createUploadthing();
                      const getUser = async () => await currentUser();
                      export const ourFileRouter = {
                        media: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
                          .middleware(async (req) => {
                            const user = await getUser();
                            if (!user) throw new Error("Unauthorized");
                            return { userId: user.id };
                          })
                          .onUploadComplete(async ({ metadata, file }) => {
                            console.log("Upload complete for userId:", metadata.userId);
                            console.log("file url", file.url);
                          }),
                      } satisfies FileRouter;
                      export type OurFileRouter = typeof ourFileRouter;
                    ```

       - ***Step 2 - Create a Next.js API route using the FileRouter ***
                    - Create a file route.ts with path `app/api/uploadthing/route.ts`.
                    - Copy the code from documentation. No change.
                  
       - ***Step 3 - Create a Next.js API route using the FileRouter ***
                    - Create The UploadThing Components (Recommended) in file uploadthing.ts with path `src/utils/uploadthing.ts`.
                    - Here, we use `generateReactHelpers` to use hooks like `useUploadThing`, `uploadFiles` provided by Uploadthing.

    - Now, that our uploadthing is set up, we use useUploadThing hook to upload files.
    - Now if we have the file and it has a url, then we set the value of profilephoto to uploaded file url. There is no need to use useState hook to update the form. It is automatically done by React Hook Form. 
        ```
           const onSubmit = async (values: z.infer<typeof UserValidation>) => {
             const blob = values.profile_photo;
         
             const hasImageChanged = isBase64Image(blob);
             if (hasImageChanged) {
         
               const imgRes = await startUpload(files);
         
               if (imgRes && imgRes[0].url) {
                 values.profile_photo = imgRes[0].url;
               }
             }
           }
        ```

6. *Backend* -->
   - Majority of nextjs pages are server side rendered page because we get SEO benefits.We can still have client components inside server side rendered page but the page itself will be rendered in server side.
   - In our react app, we had client side rendered react frontend, which used nodejs server with multiple api endpoint to fetch data from database.
        `Client Side React App <--> Node js Server <--> Database`

   - But in case of Nextjs, we can completely eliminate the need of api endpoints because we are already on server side.
   Here, we have cleint side components which can fetch data with the help of simple JS fucntion from database while everything client side components, JS functions and database are in our NextJs application.No need to create additional backend servers.

   ### Step 1 -> Creating an active instance of MongoDB-->
     1. Create a file `mongoose.ts` inside `lib` folder. This file will contain code related to connection with mongodb database.
     2. Import mongoose. Create a variable `isConencted` and set it to false which will tell whether db is connected or not.
     3. Next create a function `connectToDB` which is a async function, inside this set `strict query` true. 
     Now, if we dont have `MONGODB_URL` then return a missing url message.
     If the db is connected the log statement "MongoDB connection already established" and return.
     4. Now, open a try catch block to connect to db, set `isConnected` to true and return a message "MongoDB connected successfully" else in catch log error.

     - Now, create a instance in mongodb atlas, enter details , enter your IP address, and copy password of your user. In network access, allow access for everyone. and at last database -> connect -> drivers -> copy url link.
     - Now, in `env.local` file, set MONGODB_URL to copied url and replace password from copied password of user.
     ```
        import mongoose from 'mongoose';
        let isConnected = false;
        export const connectToDB = async () => {
            mongoose.set('strictQuery', true);
            if(!process.env.MONGO_URL) return console.log('MONGODB_URL not found');
            if(isConnected) return console.log('Already connected to MongoDB');
            try{
                await mongoose.connect(process.env.MONGO_URL);
                isConnected = true;
                console.log("MonogoDb connected");
            }catch(error){
                console.log(error);
            }
        }
     ```

   ### Step 2 -> Creating a model of our user-->
     1. Create a file `user.model.ts` inside `models` folder in `lib` folder.
     2. Inside this file create a user schema which will have properties `id`, `username`, `name`, `image`, `bio`.
     Now, each user can upload threads with reference thread and type `mongoose.Schema.Types.ObjectId`.So, we will create a array for storing users threads. Same for communities.
     User will also have onboarded property telling if user is signed in or not, by default will be set to null.
     3. Lastly export our User with schema `userSchema`.

     ```
        import mongoose from "mongoose";
        const userSchema = new mongoose.Schema({
          id: {
            type: String,
            required: true,
          },
          username: {
            type: String,
            unique: true,
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          image: String,
          bio: String,
          threads: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Thread", // means one user can have references to threads stored in database.
            },
          ],
          onboarded: {
            type: Boolean,
            default: false,
          },
          communities: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Community",
            },
          ],
        });
        const User = mongoose.models.User || mongoose.model("User", userSchema);   // if we have a user model export it, else create a user model
        export default User;
     ```

   ### Step 3 -> Creating a file contaiining user actions to update the user -->
     1. Create a file named `user.actions.ts` in the `lib/actions/user.actions.ts`.
     2. This is server side work so we need to write `use server` tag at top of the file.
     3. Export a async function `updateuser` which will return a promise of type void. Now, a user can update their userid, bio, name , username and image in their profile by calling this function.
     4. Now, firstly we need to establish a connected to the database. Then, find the User and update properties using `findOneAndUpdate`.
     5. Now, we have operation named `Upsert`
        *An upsert is a database operation that will update an existing row if a specified value already exists in a table, and insert a new row if the specified value doesn't already exist.*
     6. After this, if the path is `/profile/edit`, then we can just valdiate the path using a function `revalidatePath`.
        *revalidatePath allows you to purge cached data on-demand for a specific path.*
     7. If a error occurs we can log the error.
     8. Create a interface `Params` containing all props required.
        ```
            interface Params{
                userId : string,
                username : string,
                bio : string,
                image : string,
                path : string,
                name : string,
            }
            export async function updateUser({userId, bio, name, path, username, image,}: Params): Promise<void> {
              try {
                connectToDB();
                await User.findOneAndUpdate(
                  { id: userId },
                  {
                    username: username.toLowerCase(),
                    name,
                    bio,
                    image,
                    onboarded: true,
                  },
                  { upsert: true }
                );
                if (path === "/profile/edit") {
                  revalidatePath(path);
                }
              } catch (error: any) {
                throw new Error(`Failed to create/update user: ${error.message}`);
              }
            }
        ```

   ### Step 4 -> In Accountprofile.tsx, on submiting the form we need to update the form and return to home page else same page -->
     1. Go to onsubmit function, below updating image, we need to call `updateUser` function, and pass all values from the form.
     2. Now to get path we need to use `usePathname` and to use router to navigating we need `useRouter` both come from `next/navigation`.
     3. Also if path is `/profile/edit` , we go back to onboarding page, else go to `/` route.
     ```
        const onSubmit = async (values: z.infer<typeof UserValidation>) => {
          const blob = values.profile_photo;
          const hasImageChanged = isBase64Image(blob);
          if (hasImageChanged) {
            const imgRes = await startUpload(files);
            if (imgRes && imgRes[0].url) {
              values.profile_photo = imgRes[0].url;
            }
          }
          await updateUser({
            userId : user.id,
            name : values.name,
            path : pathname,
            bio : values.bio,
            username : values.username,
            image : values.profile_photo,
          });
          if(pathname === '/profile/edit'){
            router.back();
          }else{
            router.push('/');
          }
        }
     ```

7. *Create Thread -->*

   ### Step 1 -> Create a fetchUser function in user.actions.ts -->
     1. To fetch user we need to firstly connect to the database.
     2. Then, find user by id and populate the communities referenced to that particular user .
        ```
        export async function fetchUser(userId : string){
            try{
                connectToDB();
                return await User.findOne({ id : userId})
                .populate({
                    path : "communities",
                    model : Community,
                })
            }catch(error : any){
                throw new Error(`Failed to fetch user : ${error.message}`)
            }
        }
        ```

    ### Step 2 --> Creating the create threads page -->
      1. Create a file `page.tsx` inside `/(root)/create-thread/page.tsx`.
      2. This is the page to create thread. 
      3. First we need the current user which will be provided by clerk itself. Next we will get userInfo from `fetchUser` function. If we dont have the user we can just return null.  
      4. If the user is not onboarded, means if the user has not filled its details,then redirect to onboarding.
      5. We will use a form to create a thread . So we will create a component `PostThread` sending it user id to fetch user.
      ```
         import { currentUser } from "@clerk/nextjs";
         import { redirect } from "next/navigation";
         import PostThread from "@/components/forms/PostThread";
         import { fetchUser } from "@/lib/actions/user.actions";
         async function Page() {
           const user = await currentUser();
           if (!user) return null;
           const userInfo = await fetchUser(user.id);
           if (!userInfo?.onboarded) redirect("/onboarding");
           return (
             <>
               <h1 className='head-text'>Create Thread</h1>
               <PostThread userId={userInfo._id} />
             </>
           );
         }
         export default Page;
      ```

    ### Step 3 --> Create a Thread Validation and Comment Validation -->
      1. Create a file `thread.ts` inside `lib/validations/thread.ts` containing `ThreadValidation` and `CommentValidation`.
      2. Now, thread should be minimum 3 characters and accountId is a string.
      3. For comment validation, we need a message of minimum 3 characters.  
        ```
           import * as z from "zod";
           export const ThreadValidation = z.object({
             thread: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
             accountId: z.string(),
           });
           export const CommentValidation = z.object({
             thread: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
           });
        ```

    ### Step 4 --> Creating a model for threads -->
      1. Create a file `thread.model.ts` inside `lib/models/thread.model.ts` containing `Thread` model.
      2. Now for thread, we need Author which is the user, text, createdAt time, parentId that is id of parent comment (top-level threads) (a thread that is not a comment/reply), community if the user is a part of a community, children which means one thread can have multiple threads.
      ```
         import mongoose from "mongoose";
         const threadSchema = new mongoose.Schema({
           text: {type: String,required: true,},
           author: {
             type: mongoose.Schema.Types.ObjectId,
             ref: "User",required: true,
           },
           community: {type: mongoose.Schema.Types.ObjectId,ref: "Community",},
           createdAt: {type: Date,default: Date.now,},
           parentId: {type: String,},
           children: [
             {
               type: mongoose.Schema.Types.ObjectId,ref: "Thread",
             },
           ],
         });
         const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema);
         export default Thread;
      ```
      
    ### Step 4 --> Create a thread action file which will contain all functions required for threads -->
      1. Create a file `thread.actions.ts` inside `lib/actions/thread.actions.ts`.
      2. For params, we need text, author, communityId, and path.
      3. Now, create a function `createThread` which will accept props text, author, communityId, and path. 
      4. First of all, connect to Db, now create thread with text, author, community id any else null.
      5. Update the user model by pushing created thread in Threads array referenced for user, and finally revalidate path.
      6. Add all this in try catch block, return error in catch block if any.
         ```
            interface Params {
              text: string, author: string, communityId: string | null, path: string,
            }
            export async function createThread({ text, author, communityId, path }: Params
            ) {
              try {
                connectToDB();
                const createdThread = await Thread.create({
                  text,
                  author,
                  community: communityIdObject, // Assign communityId if provided, or leave it null for personal account
                });
                // Update User model
                await User.findByIdAndUpdate(author, {
                  $push: { threads: createdThread._id },
                });
                revalidatePath(path);
              } catch (error: any) {
                throw new Error(`Failed to create thread: ${error.message}`);
              }
            }
         ```

    ### Step 5 --> Create the form for posting threads -->
      1. Create a file `PostThread.tsx` inside `components/forms/PostThread.tsx`.
      2. Now, thread will be created by user, so we will add a tag `use client` at top of the file.
      3. We need form, zod for validation, useForm hook, button to submit, textarea to add thread, a Prop that is userId for account id, thread validation, useOrganization for community id.
      4. Create a function PostThread, which is the form. We will be using useForm to apply ThreadValidation. This function returns a form containing a form field of textarea, a button to submit and a onsubmit handler.
      5. This onsubmit function awaits a create thread function which will take value of thread in text field, author and community id. And then redirect to home page.

      ```
         "use client";
         import * as z from "zod";
         import { useForm } from "react-hook-form";
         import { useOrganization } from "@clerk/nextjs";
         import { zodResolver } from "@hookform/resolvers/zod";
         import { usePathname, useRouter } from "next/navigation";
         import {
           Form,
           FormControl,
           FormField,
           FormItem,
           FormLabel,
           FormMessage,
         } from "@/components/ui/form";
         import { Button } from "@/components/ui/button";
         import { Textarea } from "@/components/ui/textarea";
         import { ThreadValidation } from "@/lib/validations/thread";
         import { createThread } from "@/lib/actions/thread.actions";
         interface Props {
           userId: string;
         }
         function PostThread({ userId }: Props) {
           const router = useRouter();
           const pathname = usePathname();
           const { organization } = useOrganization();
           const form = useForm<z.infer<typeof ThreadValidation>>({
             resolver: zodResolver(ThreadValidation),
             defaultValues: {
               thread: "",
               accountId: userId,
             },
           });
           const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
             await createThread({
               text: values.thread,
               author: userId,
               communityId: organization ? organization.id : null,
               path: pathname,
             });
             router.push("/");
           };
           return (
             <Form {...form}>
               <form
                 className='mt-10 flex flex-col justify-start gap-10'
                 onSubmit={form.handleSubmit(onSubmit)}
               >
                 <FormField
                   control={form.control}
                   name='thread'
                   render={({ field }) => (
                     <FormItem className='flex w-full flex-col gap-3'>
                       <FormLabel className='text-base-semibold text-light-2'>
                         Content
                       </FormLabel>
                       <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                         <Textarea rows={15} {...field} />
                       </FormControl>
                       <FormMessage />
                     </FormItem>
                   )}
                 />
                 <Button type='submit' className='bg-primary-500'>
                   Post Thread
                 </Button>
               </form>
             </Form>
           );
         }
         export default PostThread;
      ```

    ### Step 6 --> Create a fetch post function inside `thread.actions.ts` file -->
      1. Create a fetch post function in `thread.actions.ts` file.
      2. This function will take 2 arguments that is page number and page size of the home page.
      3. Now, if we want to go to next page we skip some post which will be calculated by skipping post in one page,i.e., pagesize * page number.
      4. Now, we create a postQuery which will find threads, which have no parent that is they are the main thread not comments, and sort threads in descending order of posting, i.e., new threads appear on top.
      5. A skipAmount if we skip a page, limit which is the page size. We will populate thread with author and users,communities and populate children field with author, image and user. No need for other info about children.
      6. Next, count all threads available which have no parents [top-level comments]. Store all posts from postquery in a variable. This will be used to know whether we can go to next page or not.
      7. Then return posts and isNext from this fetchPosts function.
         ```
            export async function fetchPosts(pageNumber = 1, pageSize = 20) {
              connectToDB();
              // Calculate the number of posts to skip based on the page number and page size.
              const skipAmount = (pageNumber - 1) * pageSize;
              // Create a query to fetch the posts that have no parent (top-level threads) (a thread that is not a comment/reply).
              const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
                .sort({ createdAt: "desc" }) //newer ones comes first.
                .skip(skipAmount)
                .limit(pageSize)
                .populate({
                  path: "author",
                  model: User,
                })
                .populate({
                  path: "community", model: Community,
                })
                .populate({
                  path: "children", // Populate the children field
                  populate: {
                    path: "author", // Populate the author field within children
                    model: User,
                    select: "_id name parentId image", // Select only _id and username fields of the author
                  },
                });
              // Count the total number of top-level posts (threads) i.e., threads that are not comments.
              const totalPostsCount = await Thread.countDocuments({
                parentId: { $in: [null, undefined] },
              }); // Get the total count of posts
              const posts = await postsQuery.exec();
              const isNext = totalPostsCount > skipAmount + posts.length; //check for next page.
              return { posts, isNext };
            }
         ```
    ### Step 7 --> Displaying thread on home page -->
      1. Inside `page.tsx` inside `(root)`, First we need a user which we will get from `currentUser`.
      2. Get userinfo, if the user is not onboarded we will redirect to onboarding page.
      3. Fetch the threads from fetchPosts function. Now , this function Home will return a fragment tag, if the result threads is empty then we dont have any thread to show. If we have a thread then we will use map method to show all thread.
      4. We will show thread in a `ThreadCard` component, which will have key, id, currentUserId, parentId, content, author, community, createdAt, and comments.
         ```
            import { currentUser } from "@clerk/nextjs";
            import { redirect } from "next/navigation";
            import ThreadCard from "@/components/cards/ThreadCard";
            import Pagination from "@/components/shared/Pagination";
            import { fetchPosts } from "@/lib/actions/thread.actions";
            import { fetchUser } from "@/lib/actions/user.actions";
            async function Home({ searchParams, }: {
              searchParams: { [key: string]: string | undefined };
            }) {
              const user = await currentUser();
              if (!user) return null;
              const userInfo = await fetchUser(user.id);
              if (!userInfo?.onboarded) redirect("/onboarding");
              const result = await fetchPosts(
                searchParams.page ? +searchParams.page : 1, 30
              );
              return (
                <>
                  <h1 className='head-text text-left'>Home</h1>
                  <section className='mt-9 flex flex-col gap-10'>
                    {result.posts.length === 0 ? (
                      <p className='no-result'>No threads found</p>
                    ) : (
                      <>
                        {result.posts.map((post) => (
                          <ThreadCard key={post._id} id={post._id} currentUserId={user.id} parentId={post.parentId}
                            content={post.text} author={post.author} community={post.community}
                            createdAt={post.createdAt} comments={post.children}
                          />
                        ))}
                      </>
                    )}
                  </section>
                  <Pagination path='/'
                    pageNumber={searchParams?.page ? +searchParams.page : 1}
                    isNext={result.isNext}
                  />
                </>
              );
            }
            export default Home;
         ```

    ### Step 8 --> Created the Thread card structure -->
      1. 
         ```
            import Image from "next/image";
            import Link from "next/link";
            import { formatDateString } from "@/lib/utils";
            import DeleteThread from "../forms/DeleteThread";
            interface Props {
              id: string; currentUserId: string; parentId: string | null; content: string;
              author: { name: string; image: string; id: string; };
              community: { id: string; name: string; image: string; } | null;
              createdAt: string;
              comments: { author: { image: string; }; }[];  // [] -> for multiple comments.
              isComment?: boolean;
            }
            function ThreadCard({
              id, currentUserId, parentId, content, author, community, createdAt, comments, isComment, }: Props) {
              return (
                <article className={`flex w-full flex-col rounded-xl ${ isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7" }`} >
                  <div className='flex items-start justify-between'>
                    <div className='flex w-full flex-1 flex-row gap-4'>
                      <div className='flex flex-col items-center'>
                        <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
                          <Image src={author.image} alt='user_community_image' fill className='cursor-pointer rounded-full' />
                        </Link>
                        <div className='thread-card_bar' />
                      </div>
                      <div className='flex w-full flex-col'>
                        <Link href={`/profile/${author.id}`} className='w-fit'>
                          <h4 className='cursor-pointer text-base-semibold text-light-1'> {author.name} </h4>
                        </Link>
                        <p className='mt-2 text-small-regular text-light-2'>{content}</p>
                        <div className={`${isComment && "mb-10"} mt-5 flex flex-col gap-3`}>
                          <div className='flex gap-3.5'>
                            <Image src='/assets/heart-gray.svg' alt='heart' width={24} height={24} className='cursor-pointer object-contain' />
                            <Link href={`/thread/${id}`}>
                              <Image src='/assets/reply.svg' alt='heart' width={24} height={24} className='cursor-pointer object-contain' />
                            </Link>
                            <Image src='/assets/repost.svg' alt='heart' width={24} height={24} className='cursor-pointer object-contain' />
                            <Image src='/assets/share.svg' alt='heart' width={24} height={24} className='cursor-pointer object-contain' />
                          </div>
                          {isComment && comments.length > 0 && (
                            <Link href={`/thread/${id}`}> <p className='mt-1 text-subtle-medium text-gray-1'> {comments.length} repl{comments.length > 1 ? "ies" : "y"} </p> </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <DeleteThread threadId={JSON.stringify(id)} currentUserId={currentUserId} authorId={author.id} parentId={parentId} isComment={isComment} />
                  </div>
                  {!isComment && comments.length > 0 && (
                    <div className='ml-1 mt-3 flex items-center gap-2'>
                      {comments.slice(0, 2).map((comment, index) => (
                        <Image key={index} src={comment.author.image} alt={`user_${index}`} width={24} height={24} className={`${index !== 0 && "-ml-5"} rounded-full object-cover`} />
                      ))}
                      <Link href={`/thread/${id}`}> <p className='mt-1 text-subtle-medium text-gray-1'> {comments.length} repl{comments.length > 1 ? "ies" : "y"} </p> </Link>
                    </div>
                  )}
                  {!isComment && community && (
                    <Link href={`/communities/${community.id}`} className='mt-5 flex items-center' >
                      <p className='text-subtle-medium text-gray-1'> {formatDateString(createdAt)} {community && ` - ${community.name} Community`} </p>
                      <Image src={community.image} alt={community.name} width={14} height={14} className='ml-1 rounded-full object-cover' />
                    </Link>
                  )}
                </article>
              );
            }
            export default ThreadCard;
         ```

    ### Step 9 --> Creating a page to display the comments on the thread -->
      1. Create a file `page.tsx` inside `(root)/thread/[id]/page.tsx`.

```
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import Comment from "@/components/forms/Comment";
import ThreadCard from "@/components/cards/ThreadCard";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchThreadById } from "@/lib/actions/thread.actions";

export const revalidate = 0;

async function page({ params }: { params: { id: string } }) {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  const thread = await fetchThreadById(params.id);

  return (
    <section className='relative'>
      <div>
        <ThreadCard
          id={thread._id}
          currentUserId={user.id}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>

      <div className='mt-7'>
        <Comment
          threadId={params.id}
          currentUserImg={user.imageUrl}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>

      <div className='mt-10'>
        {thread.children.map((childItem: any) => (
          <ThreadCard
            key={childItem._id}
            id={childItem._id}
            currentUserId={user.id}
            parentId={childItem.parentId}
            content={childItem.text}
            author={childItem.author}
            community={childItem.community}
            createdAt={childItem.createdAt}
            comments={childItem.children}
            isComment
          />
        ))}
      </div>
    </section>
  );
}

export default page;
```



    ### Step 10 --> Create a function in `thread.actions.ts` to find thread by Id to fetch comments made on it -->
```
export async function fetchThreadById(threadId: string) {
  connectToDB();

  try {
    const thread = await Thread.findById(threadId)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      }) // Populate the author field with _id and username
      .populate({
        path: "community",
        model: Community,
        select: "_id id name image",
      }) // Populate the community field with _id and name
      .populate({
        path: "children", // Populate the children field
        populate: [
          {
            path: "author", // Populate the author field within children
            model: User,
            select: "_id id name parentId image", // Select only _id and username fields of the author
          },
          {
            path: "children", // Populate the children field within children
            model: Thread, // The model of the nested children (assuming it's the same "Thread" model)
            populate: {
              path: "author", // Populate the author field within nested children
              model: User,
              select: "_id id name parentId image", // Select only _id and username fields of the author
            },
          },
        ],
      })
      .exec();

    return thread;
  } catch (err) {
    console.error("Error while fetching thread:", err);
    throw new Error("Unable to fetch thread");
  }
}
``` 

    ### Step 11 --> Create a form for the commments -->
      1. Create a file `Comment.tsx` in `components/forms/Comment.tsx`

```
"use client";

import { z } from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { CommentValidation } from "@/lib/validations/thread";
import { addCommentToThread } from "@/lib/actions/thread.actions";

interface Props {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

function Comment({ threadId, currentUserImg, currentUserId }: Props) {
  const pathname = usePathname();

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addCommentToThread(
      threadId,
      values.thread,
      JSON.parse(currentUserId),
      pathname
    );

    form.reset();
  };

  return (
    <Form {...form}>
      <form className='comment-form' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full items-center gap-3'>
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt='current_user'
                  width={48}
                  height={48}
                  className='rounded-full object-cover'
                />
              </FormLabel>
              <FormControl className='border-none bg-transparent'>
                <Input
                  type='text'
                  {...field}
                  placeholder='Comment...'
                  className='no-focus text-light-1 outline-none'
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type='submit' className='comment-form_btn'>
          Reply
        </Button>
      </form>
    </Form>
  );
}

export default Comment;
```

    ### Step 12 --> Create a function `addCommentToThread` in `thread.actions.ts` to add comment-->
      1. Create a function `addCommentToThread` inside `thread.actions.ts` to add comment.

```
export async function addCommentToThread(
  threadId: string,
  commentText: string,
  userId: string,
  path: string
) {
  connectToDB();

  try {
    // Find the original thread by its ID
    const originalThread = await Thread.findById(threadId);

    if (!originalThread) {
      throw new Error("Thread not found");
    }

    // Create the new comment thread
    const commentThread = new Thread({
      text: commentText,
      author: userId,
      parentId: threadId, // Set the parentId to the original thread's ID
    });

    // Save the comment thread to the database
    const savedCommentThread = await commentThread.save();

    // Add the comment thread's ID to the original thread's children array
    originalThread.children.push(savedCommentThread._id);

    // Save the updated original thread to the database
    await originalThread.save();

    revalidatePath(path);
  } catch (err) {
    console.error("Error while adding comment:", err);
    throw new Error("Unable to add comment");
  }
}
```

8. *Create Profile -->*
   
   ### Step 1 --> Create a file `page.tsx` inside `(root)/profile/[id]/page.tsx` -->
     1. 

```
import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { profileTabs } from "@/constants";

import ThreadsTab from "@/components/shared/ThreadsTab";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { fetchUser } from "@/lib/actions/user.actions";

async function Page({ params }: { params: { id: string } }) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />

      <div className='mt-9'>
        <Tabs defaultValue='threads' className='w-full'>
          <TabsList className='tab'>
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className='tab'>
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className='object-contain'
                />
                <p className='max-sm:hidden'>{tab.label}</p>

                {tab.label === "Threads" && (
                  <p className='ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2'>
                    {userInfo.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab) => (
            <TabsContent
              key={`content-${tab.label}`}
              value={tab.value}
              className='w-full text-light-1'
            >
              {/* @ts-ignore */}
              <ThreadsTab
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType='User'
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
export default Page;
```

### Step 2 --> Create a file `ProfileHeader.tsx` inside `components/shared/ProfileHeader.tsx` -->

```
import Link from "next/link";
import Image from "next/image";

interface Props {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
  type?: string;
}

function ProfileHeader({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  type,
}: Props) {
  return (
    <div className='flex w-full flex-col justify-start'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div className='relative h-20 w-20 object-cover'>
            <Image
              src={imgUrl}
              alt='logo'
              fill
              className='rounded-full object-cover shadow-2xl'
            />
          </div>

          <div className='flex-1'>
            <h2 className='text-left text-heading3-bold text-light-1'>
              {name}
            </h2>
            <p className='text-base-medium text-gray-1'>@{username}</p>
          </div>
        </div>
        {accountId === authUserId && type !== "Community" && (
          <Link href='/profile/edit'>
            <div className='flex cursor-pointer gap-3 rounded-lg bg-dark-3 px-4 py-2'>
              <Image
                src='/assets/edit.svg'
                alt='logout'
                width={16}
                height={16}
              />

              <p className='text-light-2 max-sm:hidden'>Edit</p>
            </div>
          </Link>
        )}
      </div>

      <p className='mt-6 max-w-lg text-base-regular text-light-2'>{bio}</p>

      <div className='mt-12 h-0.5 w-full bg-dark-3' />
    </div>
  );
}

export default ProfileHeader;
```

### Step 3 --> Create a file `ThreadsTab.tsx` inside `components/shared/Threadstab.tsx` -->
1. Instll tabs from shadcn.

```
import { redirect } from "next/navigation";

import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import { fetchUserPosts } from "@/lib/actions/user.actions";

import ThreadCard from "../cards/ThreadCard";

interface Result {
  name: string;
  image: string;
  id: string;
  threads: {
    _id: string;
    text: string;
    parentId: string | null;
    author: {
      name: string;
      image: string;
      id: string;
    };
    community: {
      id: string;
      name: string;
      image: string;
    } | null;
    createdAt: string;
    children: {
      author: {
        image: string;
      };
    }[];
  }[];
}

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

async function ThreadsTab({ currentUserId, accountId, accountType }: Props) {
  let result: Result;

  if (accountType === "Community") {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchUserPosts(accountId);
  }

  if (!result) {
    redirect("/");
  }

  return (
    <section className='mt-9 flex flex-col gap-10'>
      {result.threads.map((thread) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : {
                  name: thread.author.name,
                  image: thread.author.image,
                  id: thread.author.id,
                }
          }
          community={
            accountType === "Community"
              ? { name: result.name, id: result.id, image: result.image }
              : thread.community
          }
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
    </section>
  );
}

export default ThreadsTab;
```

### Step 4 --> Create a function `fetchUserPosts` inside `ThreadTab.tsx`-->

```
export async function fetchUserPosts(userId: string) {
  try {
    connectToDB();

    // Find all threads authored by the user with the given userId
    const threads = await User.findOne({ id: userId }).populate({
      path: "threads",
      model: Thread,
      populate: [
        {
          path: "community",
          model: Community,
          select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
        },
        {
          path: "children",
          model: Thread,
          populate: {
            path: "author",
            model: User,
            select: "name image id", // Select the "name" and "_id" fields from the "User" model
          },
        },
      ],
    });
    return threads;
  } catch (error) {
    console.error("Error fetching user threads:", error);
    throw error;
  }
}

```

### Step 5 --> -->

8. *Create Search Page -->*
  
   ### Step 1 --> Create a page.tsx in `(root)/search/page.tsx` -->

   ### Step 2 --> Same for activity and communities -->

   ### Step 3 --> Create a function fetchUsers inside `user.actions.ts` -->

   ### Step 4 --> Create a UserCard for user while searching  inside cards/UserCard.tsx -->

9. *Create Activity Tab -->*
   ### Step 1 --> Create a page.tsx in `(root)/activity/page.tsx` -->

   ### Step 2 --> Create a function  `getActivity` inside `user.actions.ts` -->

   ### Step 3 --> Center the authentication card inside (auth)/layout.tsx

10.  *Create Communities Tab -->*

   ### Step 1 --> Create a file `route.ts` inside api/webhook/clerk/route.ts -->
      1. Use of web hook.
         Clerk se hum orgranization bana skte h. But how will instantly added in our app. So herwe we use Webhooks.
      A common set up for applications involves a frontend for customers to interact with a backend that includes a database. Since authentication and user management happens on Clerk's side, data eventually needs to reach the application's backend.

The recommended way to sync data between Clerk and your application's backend is via webhooks.
  `https://clerk.com/docs/users/sync-data`


   ### Step 2 --> Create a community.actions.ts file -->
   ### Step 3 --> Create a model for community in community.model.ts file -->

   ### Step 4 --> create a file ''route.ts' containning web hook code

11. 