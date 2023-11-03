import {FC, useEffect, useState} from "react";
import "./userList.scss";
import { IUser } from "../../types/user-type";
import UserService from "../../services/user-service";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/button/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const UserList: FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getUsers = async () => {
            try{
                const users = await UserService.listUsers()
                
                setUsers(users.data.data)
            }catch(e: any){
                setError(e.response.data.message)
            }
        }
        getUsers()
 
    }, []);

    const handleDelete = async(userId: number) => {
      await UserService.deleteUser(userId);      
      setUsers(users.filter((prevUser) => (prevUser.id !== userId)));
      
    }

    const handleUpdate = async(userId: number) => {
      navigate(`edit/${userId}`)
    }


  return (
    <>
      <div className="userlistHeader"><h2>User list</h2>
      <div className={'createButton'}>
        <Button
            text={'Create user'}
            type={'button'}
            handleClick={() => navigate("create")}
        />
      </div></div>
      
      <TableContainer component={Paper} className="usersList">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Views</TableCell>
              <TableCell>Likes</TableCell>
              <TableCell>Comments</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell component="th" scope="row">
                <img
                    src={user.profilePicture}
                    className="profileImage"
                    alt="profileAvatar"/>
                </TableCell>
                <TableCell component="th" scope="row">
                  {user.firstName}
                </TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.activity.articles}</TableCell>
                <TableCell>{user?.activity?.reactions}</TableCell>
                <TableCell>{user.activity.comments}</TableCell>
                <TableCell>
                  <div className={'userUpdateActions'}>
                    <div onClick={() => handleUpdate(user.id)} className={'userUpdate'}>
                        <EditIcon className={'userUpdateIcon'}/>
                    </div>
                    <div onClick={() => handleDelete(user.id)} className={'userUpdate'}>
                        <DeleteIcon className={'userDeleteIcon'}/>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserList
