import { useNavigate } from 'react-router-dom';
import { Student, Teacher } from '../../services/auth/auth.interface';
import { useState } from 'react';
import { deleteStudent } from '../../services/students/students';

interface StudentsListProps {
  students: Student[];
}

const StudentsList = ({ students }: StudentsListProps) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("")
  
  const deleteTeacherBtb = (studentId : string) => {
    deleteStudent(studentId).then(res => {
        if(res){
            setMessage("Student deleted.")
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
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.email}</td>
            <td>{student.first_name}</td>
            <td>{student.last_name}</td>
            <td><button className="btn btn-danger" onClick={() => deleteTeacherBtb(student.id)} >Remove</button></td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
   
  );
};

export default StudentsList;
