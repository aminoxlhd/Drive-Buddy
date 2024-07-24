import { useNavigate } from 'react-router-dom';
import { Teacher } from '../../services/auth/auth.interface';
import { deleteTeacher } from '../../services/teachers/Teachers';
import { useState } from 'react';

interface TeachersListProps {
  teachers: Teacher[];
}

const TeachersList = ({ teachers }: TeachersListProps) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("")
  
  const deleteTeacherBtb = (teacherId : string) => {
    deleteTeacher(teacherId).then(res => {
        if(res){
            setMessage("Teacher deleted.")
        }
    })
  }
  return (
    <>
    { message != "" && <h5 className="alert alert-success" style={{color : 'green'}}>{message}</h5>}
    <table className='table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {teachers.map((teacher) => (
          <tr key={teacher.id}>
            <td>{teacher.id}</td>
            <td>{teacher.email}</td>
            <td>{teacher.first_name}</td>
            <td>{teacher.last_name}</td>
            <td><button className="btn btn-danger" onClick={() => deleteTeacherBtb(teacher.id)} >Remove</button></td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
   
  );
};

export default TeachersList;
