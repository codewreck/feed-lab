// const startIndex = Math.floor(scrollTop / itemHeight);

// const endIndex = Math.ceil(
//   (scrollTop + viewportHeight) / itemHeight
// );

// height is 500px, item height is 100, we scrolled 750px now below is the calculation

// const startIndex = Math.floor(750 / 100); // 7
// const endIndex = Math.ceil(1250 / 100);   // 13

// items.slice(7, 13);

// the fundamental trick behind the virtualization is that we maintain the full scrollable height while maintaing the rendering of only 6 items
import React from "react";

const items = [
  { id: 1, name: "kunal", address: "bangalore" },
  { id: 2, name: "aarav", address: "mumbai" },
  { id: 3, name: "priya", address: "delhi" },
  { id: 4, name: "rohan", address: "pune" },
  { id: 5, name: "sneha", address: "hyderabad" },
  { id: 6, name: "vikram", address: "chennai" },
  { id: 7, name: "ananya", address: "kolkata" },
  { id: 8, name: "arjun", address: "jaipur" },
  { id: 9, name: "meera", address: "ahmedabad" },
  { id: 10, name: "siddharth", address: "lucknow" },
  { id: 11, name: "kavya", address: "kochi" },
  { id: 12, name: "rahul", address: "chandigarh" },
  { id: 13, name: "ishita", address: "indore" },
  { id: 14, name: "aditya", address: "nagpur" },
  { id: 15, name: "neha", address: "bhopal" },
  { id: 16, name: "karan", address: "surat" },
  { id: 17, name: "divya", address: "patna" },
  { id: 18, name: "manish", address: "ranchi" },
  { id: 19, name: "pooja", address: "coimbatore" },
  { id: 20, name: "amit", address: "visakhapatnam" },
  { id: 21, name: "shreya", address: "mysuru" },
  { id: 22, name: "nikhil", address: "udaipur" },
  { id: 23, name: "tanvi", address: "guwahati" },
  { id: 24, name: "harsh", address: "dehradun" },
  { id: 25, name: "riya", address: "thiruvananthapuram" },
  { id: 26, name: "varun", address: "vadodara" },
  { id: 27, name: "simran", address: "amritsar" },
  { id: 28, name: "yash", address: "jodhpur" },
  { id: 29, name: "aisha", address: "bhubaneswar" },
  { id: 30, name: "deepak", address: "raipur" },
  { id: 31, name: "nisha", address: "mangaluru" },
  { id: 32, name: "gaurav", address: "kanpur" },
  { id: 33, name: "swati", address: "nashik" },
  { id: 34, name: "mohit", address: "agra" },
  { id: 35, name: "pallavi", address: "madurai" },
  { id: 36, name: "abhishek", address: "varanasi" },
  { id: 37, name: "sakshi", address: "ajmer" },
  { id: 38, name: "tushar", address: "goa" },
  { id: 39, name: "anjali", address: "shimla" },
  { id: 40, name: "sandeep", address: "jammu" },
  { id: 41, name: "kritika", address: "srinagar" },
  { id: 42, name: "vivek", address: "gurgaon" },
  { id: 43, name: "bhavna", address: "noida" },
  { id: 44, name: "suresh", address: "faridabad" },
  { id: 45, name: "lakshmi", address: "tiruchirappalli" },
  { id: 46, name: "pranav", address: "kozhikode" },
  { id: 47, name: "rashmi", address: "hubballi" },
  { id: 48, name: "ankit", address: "jabalpur" },
  { id: 49, name: "payal", address: "gwalior" },
  { id: 50, name: "dev", address: "rajkot" },
  { id: 51, name: "zoya", address: "puducherry" },
];

const ITEM_SIZE = 100;
const CONTAINER_HEIGHT = 500;
const OVERSCAN = 2;

export default function Experiment() {
  const [scrollTop, setScrollTop] = React.useState(0);
  const startIndex = Math.floor(scrollTop / ITEM_SIZE);

  const endIndex = Math.min(
    items.length,
    Math.ceil((scrollTop + CONTAINER_HEIGHT) / ITEM_SIZE),
  );
  // const endIndex = Math.ceil((scrollTop + CONTAINER_HEIGHT) / ITEM_SIZE);
  const virtualStartIndex = Math.max(0, startIndex - OVERSCAN);
  const virtualEndIndex = Math.min(items.length, endIndex + OVERSCAN);
  const virtualizedItems = items.slice(virtualStartIndex, virtualEndIndex);
  const topSpacerHeight = virtualStartIndex * ITEM_SIZE;
  const bottomSpaceHeight = (items.length - virtualEndIndex) * ITEM_SIZE;

  return (
    <div>
      <div>ScrollTop: {scrollTop}</div>
      <div>Start index: {startIndex}</div>
      <div>End index: {endIndex}</div>

      <div
        style={{ height: "500px", overflowY: "scroll" }}
        onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
      >
        <div style={{ height: `${topSpacerHeight}px` }}></div>
        {virtualizedItems.map((item) => {
          const { id, name, address } = item;
          return (
            <div
              style={{
                border: "1px solid red",
                height: "100px",
                boxSizing: "border-box",
              }}
              key={id}
            >
              <div>Item: {id}</div>
              <div>Name: {name}</div>
              <div>Address: {address}</div>
            </div>
          );
        })}
        <div style={{ height: `${bottomSpaceHeight}px` }}></div>
      </div>
    </div>
  );
}
