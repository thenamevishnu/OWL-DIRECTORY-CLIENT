import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import { GrNext, GrPrevious } from "react-icons/gr";
import { IoEllipsisHorizontal } from "react-icons/io5";

const results = [
    {
      id: "9c2b9d30-8e12-4e14-9c19-c3e5b3f5c512",
      title: "npm",
      url: "https://www.npmjs.com",
      url_title: "react-battery-gauge - npm",
      description: "Latest version: 1.0.7, last published: a year ago. Start using react-battery-gauge by running `npm i react-battery-gauge`."
    },
    {
      id: "123f4a8c-9ba7-44f4-a2fc-4df9ab62f95c",
      title: "GitHub",
      url: "https://github.com",
      url_title: "axios/axios - GitHub",
      description: "Promise based HTTP client. Over 102k stars. Latest release: 1.6.0."
    },
    {
      id: "ae6b3e09-e43d-45ef-8d5b-84d51c9f8fcb",
      title: "MDN Web Docs",
      url: "https://developer.mozilla.org",
      url_title: "JavaScript Reference - MDN",
      description: "Comprehensive JavaScript documentation with real-world examples and syntax guides."
    },
    {
      id: "f9e763e1-c303-46ce-bb3c-5a46c278c46c",
      title: "Dev.to",
      url: "https://dev.to",
      url_title: "How I Built a Productivity Tracker Using React",
      description: "A personal story about building a time tracker with React and Firebase."
    },
    {
      id: "dc71b9cb-e12b-4e77-9918-4db978c7efc6",
      title: "Stack Overflow",
      url: "https://stackoverflow.com",
      url_title: "How to center a div with CSS?",
      description: "A highly-upvoted answer with various ways to center divs using Flexbox, Grid, and margin."
    },
    {
      id: "f342b511-1a3d-4370-93d7-415888c5c09a",
      title: "CSS-Tricks",
      url: "https://css-tricks.com",
      url_title: "A Complete Guide to Grid",
      description: "Everything you need to know about CSS Grid, with visuals and examples."
    },
    {
      id: "c15903f3-d961-45c0-9d3f-9c4c90e5e59a",
      title: "npm",
      url: "https://www.npmjs.com",
      url_title: "tailwindcss - npm",
      description: "Utility-first CSS framework. Version 3.4.1, last updated a week ago."
    },
    {
      id: "59ff1eb0-b993-48eb-b7d6-7bb35f6aa940",
      title: "GitHub",
      url: "https://github.com",
      url_title: "vercel/next.js - GitHub",
      description: "The React Framework for Production. Over 120k stars. Maintained by Vercel."
    },
    {
      id: "ac03d2db-1b65-4cb3-88d2-df92808988ee",
      title: "MDN Web Docs",
      url: "https://developer.mozilla.org",
      url_title: "Web Storage API - MDN",
      description: "Learn how to use localStorage and sessionStorage for persistent data."
    },
    {
      id: "61af3025-19ab-4f5e-889e-96b160244a5a",
      title: "Dev.to",
      url: "https://dev.to",
      url_title: "Top 5 Node.js Libraries in 2024",
      description: "A curated list of essential libraries for modern backend development."
    },
    {
      id: "015137b7-5c2e-4d15-974a-11b2d7767a7f",
      title: "npm",
      url: "https://www.npmjs.com",
      url_title: "framer-motion - npm",
      description: "A popular library for animations in React. Last published: 2 months ago."
    },
    {
      id: "4993214d-3276-49c2-88cf-51fc7cbf49c6",
      title: "CodeSandbox",
      url: "https://codesandbox.io",
      url_title: "React Form Validation Example",
      description: "An interactive sandbox for testing form validation with React Hook Form."
    },
    {
      id: "926f7e41-0c87-43bc-a7c3-748b45ef98f4",
      title: "Smashing Magazine",
      url: "https://www.smashingmagazine.com",
      url_title: "Dark Mode in CSS",
      description: "A guide to implementing dark mode using prefers-color-scheme."
    },
    {
      id: "f3c91d49-1aa3-463c-a122-71b91a66b205",
      title: "npm",
      url: "https://www.npmjs.com",
      url_title: "zustand - npm",
      description: "A small, fast state-management library for React. Version 4.4.1."
    },
    {
      id: "2f76b2dc-535c-4d3b-8dc9-7f8c95745ec2",
      title: "GitHub",
      url: "https://github.com",
      url_title: "facebook/react - GitHub",
      description: "The official React repository. Over 220k stars."
    },
    {
      id: "3409bdc6-c5f4-4d7d-8743-e153aab89db6",
      title: "MDN Web Docs",
      url: "https://developer.mozilla.org",
      url_title: "Fetch API - MDN",
      description: "Modern way to make HTTP requests in JavaScript."
    },
    {
      id: "cfc5c964-8b08-42b0-b3a2-d111621f4a4d",
      title: "Stack Overflow",
      url: "https://stackoverflow.com",
      url_title: "Difference between var, let and const?",
      description: "Explains scoping rules and ES6+ behavior of JavaScript variables."
    },
    {
      id: "1b6e458a-df71-4e65-90e3-899e2e587a95",
      title: "Dev.to",
      url: "https://dev.to",
      url_title: "React vs Vue: Which Should You Learn?",
      description: "An opinionated comparison between the two most popular front-end frameworks."
    },
    {
      id: "927b8b5c-71c6-46bc-98fc-f1193b2fdc69",
      title: "npm",
      url: "https://www.npmjs.com",
      url_title: "react-toastify - npm",
      description: "Easy toast notifications for React. Popular and easy to use."
    },
    {
      id: "198f5185-b22f-4214-9ed8-c0ed0d7ae25f",
      title: "CSS-Tricks",
      url: "https://css-tricks.com",
      url_title: "Responsive Design Basics",
      description: "How to build responsive layouts with media queries and fluid grids."
    },
    {
      id: "542d1b49-1666-45fd-b92a-9fa6619f2ab3",
      title: "CodePen",
      url: "https://codepen.io",
      url_title: "Pure CSS Loading Spinner",
      description: "An animated loading spinner using only HTML and CSS."
    },
    {
      id: "33ed09f0-8d5e-4a76-8518-d59f2682e048",
      title: "npm",
      url: "https://www.npmjs.com",
      url_title: "vite - npm",
      description: "Next Generation Frontend Tooling. Fast and lightweight bundler."
    },
    {
      id: "6f2d884f-202f-4cb0-b8b6-9ae4fcf3f46f",
      title: "MDN Web Docs",
      url: "https://developer.mozilla.org",
      url_title: "ARIA roles - MDN",
      description: "Accessibility guidance and reference for ARIA roles and attributes."
    },
    {
      id: "2ef4b75a-42bc-4a77-89cd-cc0f2375a3e7",
      title: "Smashing Magazine",
      url: "https://www.smashingmagazine.com",
      url_title: "Introduction to Web Accessibility",
      description: "Best practices to make your websites more accessible for everyone."
    },
    {
      id: "f6ea0124-5037-4a7d-95e1-928a41a30f2c",
      title: "GitHub",
      url: "https://github.com",
      url_title: "d3/d3 - GitHub",
      description: "Powerful JavaScript library for data visualization. Over 106k stars."
    },
    {
      id: "8a4123d2-75d1-4c1b-9d99-33890f4c7c3f",
      title: "Dev.to",
      url: "https://dev.to",
      url_title: "Understanding TypeScript in 10 Minutes",
      description: "A crash course on TypeScript basics with examples."
    },
    {
      id: "4bbef7ea-df97-4761-926a-26a6b362fc7d",
      title: "Stack Overflow",
      url: "https://stackoverflow.com",
      url_title: "What is event bubbling in JavaScript?",
      description: "Detailed explanation of how event propagation works in the DOM."
    },
    {
      id: "e5399a1e-7253-4ae0-bd01-9dd9353f78e4",
      title: "CSS-Tricks",
      url: "https://css-tricks.com",
      url_title: "Clamping Text in CSS",
      description: "A guide to showing ellipsis (...) after a certain number of lines."
    },
    {
      id: "dc543d50-3562-4e67-93c2-781b6312b450",
      title: "npm",
      url: "https://www.npmjs.com",
      url_title: "dayjs - npm",
      description: "A minimalist JavaScript date library for parsing and formatting dates."
    },
    {
      id: "e3009fc4-3f26-47fc-b0f0-8d5473f248e2",
      title: "CodeSandbox",
      url: "https://codesandbox.io",
      url_title: "Next.js Starter Template",
      description: "Interactive environment to explore and build with Next.js."
    }
]
  

export const SearchResults = () => {

    const [query, setQuery] = useState("")

    const handleSearch = (e) => {
        e.preventDefault()
    }

    return <div className="flex justify-center p-2 md:p-5">
        <div className="w-full grid grid-cols-12 justify-center max-w-[1400px]">
            <div className="col-span-12 sm:col-span-11 md:col-span-10 lg:col-span-9 xl:col-span-8 2xl:col-span-7">
                <div>
                    <form className="w-full mb-3" onSubmit={handleSearch}>
                        <div className="w-full flex items-center bg-tertiary rounded-md">
                            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the web using text or url..." className="w-full p-2 outline-none"/>
                            <button className="p-2 text-dim cursor-pointer"><FaSearch /></button>
                        </div>
                    </form>
                </div>
                <div className="flex flex-col gap-2">
                    {
                        results.map((result) => {
                            return <div className="bg-secondary rounded p-2">
                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2 items-center">
                                        <div>
                                            <img src="./owl.png" alt="owl" className="aspect-square w-[30px] bg-tertiary rounded-full p-1" />
                                        </div>
                                        <div className="flex text-xs flex-col">
                                            <p>{result.title}</p>
                                            <p>{result.url}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <IoEllipsisHorizontal />
                                    </div>
                                </div>
                                <div className="mt-1">
                                    <h2 className="text-xl cursor-pointer text-[#ADC2FC]" onClick={() => window.open(result.url, "_current")}>{result.url_title}</h2>
                                    <p>{result.description}</p>
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className="flex justify-center gap-3 mt-4">
                    <button className="p-2 bg-secondary px-4 cursor-pointer rounded font-bold"><GrPrevious /></button>
                    <button className="p-2 bg-secondary px-4 cursor-pointer rounded font-bold"><GrNext /></button>
                </div>
            </div>
        </div>
    </div>
}