let helloWorld = "Hello World";

interface User {
  name: string;
  id: number;
}
 
class UserAccount {
  name: string;
  id: number;
  
 
  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}
 
const user: User = new UserAccount("Yufan", 702451740);


type WindowsVersion = "xp" | "10" | "11";
type FaceID = "locked" | "unlocked";
type PositiveEvenNumbersUnderTen = 2 | 4 | 6 | 8 | 10;



interface Point {
  x: number;
  y: number;
}
 
function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}
 
const point = { x: 99, y: 22 };
logPoint(point);