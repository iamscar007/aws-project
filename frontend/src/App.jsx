import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Home from "./pages/Home"
import Detail from "./pages/Detail"
import MyList from "./pages/MyList"
import Navbar from "./components/Navbar"
import Recommend from "./pages/Recommend"

function Protected({children}){
const token = localStorage.getItem("token")
return token ? children : <Navigate to="/login"/>
}

function App(){
return(
<BrowserRouter>

<Navbar/>

<Routes>
<Route path="/login" element={<Login/>}/>
<Route path="/signup" element={<Signup/>}/>
<Route path="/" element={<Protected><Home/></Protected>}/>
<Route path="/detail/:id" element={<Protected><Detail/></Protected>}/>
<Route path="/mylist" element={<Protected><MyList/></Protected>}/>
<Route path="/recommend" element={<Recommend/>}/>
</Routes>

</BrowserRouter>
)
}

export default App