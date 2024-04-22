import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LandingImg from '../assets/admin.png'
import ProjectCard from '../components/ProjectCard'
import { Card } from 'react-bootstrap'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getHomeProjectsAPI } from '../services/allAPI'

function Home() {
  const [homeProjects,setHomeProjects] = useState([])
  const navigate = useNavigate()
  const [loginStatus,setLoginStatus] = useState(false)
  console.log(homeProjects);
  
  useEffect(()=>{
    getHomeProjects()
    if(sessionStorage.getItem("token")){
      setLoginStatus(true)
    }else{
      setLoginStatus(false)
    }
  },[])

  const handleProjects = ()=>{
    if(loginStatus){
      navigate('/projects')
    }else{
      toast.warning("Please login to get full access to our Projects!!!!")
    }
  }

  const getHomeProjects = async ()=>{
    try{
      const result = await getHomeProjectsAPI()
      console.log(result);
      if(result.status==200){
        setHomeProjects(result.data)
      }
    }catch(err){
      console.log(err);
    }
  }

  return (
    <>

{/* landing */}
      <div style={{minHeight:'100vh'}} className="w-100 d-flex justify-content-center align-items-center rounded  shadow">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 style={{fontSize:'80px'}}> <i className="fa-brands fa-docker"></i> Project Fair</h1>
              <p style={{textAlign:'justify'}}>One Stop Destination for all Software Development Projects. Where User can add and manage their projects. As well as access all projects available in our website... What are you waiting for!!!</p>
              { 
                loginStatus ?
                <Link to={'/dashboard'} className='btn btn-warning'>Manage Your Projects <i className="fa-solid fa-arrow-right"></i> </Link>
                :
                <Link to={'/login'} className='btn btn-warning'>Starts to Explore <i className="fa-solid fa-arrow-right"></i> </Link>
              }
            </div>
            <div className="col-lg-6">
              <img className='img-fluid' src={LandingImg} alt="" />
            </div>
          </div>
        </div>
      </div>
{/* projects */}
      <div className="mt-5 text-center">
        <h1 className=' mb-5'>Explore Our Projects</h1>
        <marquee>
          <div className="d-flex">
            { 
            homeProjects?.length>0 &&
             homeProjects?.map(project=>(
              <div key={project} className="me-5">
                <ProjectCard displayData={project}/>
              </div>
             ))
            }
          </div>
        </marquee>
        <button onClick={handleProjects} className='btn btn-link mt-3'>Click here to View More Projects...</button>
      </div>
{/* testimony */}
    <div className="d-flex  align-items-center mt-5 mb-5 flex-column">
      <h1>Our Testimonials</h1>
      <div className='d-flex justify-content-evenly align-items-center mt-3 w-100'>
      <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
         <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://tse4.explicit.bing.net/th?id=OIP.eCPkveRpfqQw3SeIw6_VOgAAAA&pid=Api&P=0&h=180" alt="" />
         <span> Max Miller</span>
        </Card.Title>
        <Card.Text>
          <div className="d-flex justify-content-center">
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          </div>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur, quisquam non culpa ea quis iusto autem</p>
        </Card.Text>
      </Card.Body>
      </Card>
      <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
         <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://tse4.mm.bing.net/th?id=OIP.WpnGIPj1DKAGo-CP64znTwHaHa&pid=Api&P=0&h=180" alt="" />
         <span> Alexia Montee</span>
        </Card.Title>
        <Card.Text>
          <div className="d-flex justify-content-center">
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-regular fa-star"></i>
          </div>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur, quisquam non culpa ea quis iusto autem</p>
        </Card.Text>
      </Card.Body>
      </Card>
      <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title className='d-flex justify-content-center align-items-center flex-column'>
         <img width={'60px'} height={'60px'} className='rounded-circle img-fluid' src="https://cdn3.iconfinder.com/data/icons/avatars-flat/33/man_5-1024.png" alt="" />
         <span> Luke Damian</span>
        </Card.Title>
        <Card.Text>
          <div className="d-flex justify-content-center">
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-solid fa-star text-warning"></i>
          <i className="fa-regular fa-star"></i>
          <i className="fa-regular fa-star"></i>
          </div>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur, quisquam non culpa ea quis iusto autem</p>
        </Card.Text>
      </Card.Body>
      </Card>
      </div>
    </div>
    <ToastContainer position="top-center" theme="colored" autoClose={3000} />
    </>
  )
}

export default Home