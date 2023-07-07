import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import './UserDetails.css'
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';





export const UserPage = () => {
  const location = useLocation();
  const userdata = location.state?.userdata;
  const data=["Name","Username","Email","PhoneNo","Address","ZipCode","Website","Company"]
 
  function stringAvatar(name: string) {
    return {
      
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  return (
    <Box className='cardBox'>
    <Card  className='card'>
    <Avatar {...stringAvatar(userdata.name)} className='avtar' />
      <CardContent className='cardContent'>
        <Box className='titleBox'>
          { data.map((titledata,index)=>(
        <Typography className='title'>{titledata}</Typography>
      ))}
        </Box>
        <Box className='detailBox'>
        <Typography>{userdata.name}</Typography>
        <Typography>{userdata.username}</Typography>
        <Typography>{userdata.email}</Typography>
        <Typography>{userdata.phone}</Typography>
        <Typography>{userdata.address.street},{userdata.address.suite},{userdata.address.city}</Typography>
        <Typography>{userdata.address.zipcode}</Typography>
        <Typography>{userdata.website}</Typography>
        <Typography>{userdata.company.name}</Typography>
        </Box>
      </CardContent>
      <Button className='homeButton' variant="outlined" component={Link} to={'/'}>Home</Button>
    </Card>
    </Box>
  )
}
