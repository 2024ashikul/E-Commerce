import LowerNav from "./LowerNav";
import UpperNav from "./UpperNav";


export default function NavBar(){

    return (
    <>
    <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <UpperNav></UpperNav>
      <LowerNav></LowerNav>
</div>  
    </>
    )
}