import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@material-ui/core/Button';
import { Snackbar, TextField } from '@mui/material';
import Avatar from '@material-ui/core/Avatar';
import MuiAlert from '@material-ui/lab/Alert';
import { utils as XLSXUtils, writeFile } from 'xlsx';


class MyClass extends React.Component {
    constructor(props) {
        super(props);
        const columns = [
            // {
            //     field: 'picture',
            //     headerName: 'Avatar',
            //     width: 120,
            //     headerAlign: 'center',
            //     renderCell: (params) => (
            //         <div >
            //             <Avatar alt='' src={params.value} />
            //         </div>
            //     ),
            // },
            {
                field: 'mssv',
                headerName: 'MSSV',
                width: 120,
                headerAlign: 'center',
            },
            {
                field: 'firstName',
                headerName: 'Họ',
                width: 150,
                headerAlign: 'center',
            },
            {
                field: 'lastName',
                headerName: 'Tên',
                width: 150,
                headerAlign: 'center',
            },
            // {
            //     field: 'country',
            //     headerName: 'Địa chỉ',
            //     width: 150,
            //     headerAlign: 'center',
            // },
            {
                field: 'gender',
                headerName: 'Giới tính',
                width: 130,
                headerAlign: 'center',
            },
            {
                field: 'CTDT',
                headerName: 'Chương trình đào tạo',
                width: 350,
                headerAlign: 'center',
            },
            {
                field: 'phone',
                headerName: 'SĐT',
                width: 180,
                headerAlign: 'center',
            },
            {
                field: 'email',
                headerName: 'Email',
                width: 250,
                headerAlign: 'center',
            },
            {
                field: 'actions',
                headerName: 'Actions',
                width: 125,
                headerAlign: 'center',
                renderCell: (params) => (
                    <div style={{ marginTop: 10, cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                        <IconButton size="large" style={{ marginBottom: '10px' }} color="inherit" onClick={() => this.editRow(params.value)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton size="large" style={{ marginBottom: '10px' }} color="inherit" onClick={() => this.deleteRow(params.value)}>
                            <DeleteForIcon />
                        </IconButton>
                    </div>

                ),
            },
        ];


        console.log('props.students', props.students);

        this.state = {
            columns: columns,
            students: [],
            newStudent: [],
            selectedClass: props.selectedClass,
            openConfirmation: false,
            openEditor: false,
            editStudent: null,
            editedStudent: null,
            totalStudents: 0,
            maxID: 1,
            openSnackbar: false,
            snackbarInfo: '',
            severity: 'success',
        };
    }

    static getDerivedStateFromProps(props, state) {
        //console.log('MyClass getDerivedStateFromProps', props.className, props.newStudent);
        let totalStudents = 0;
        if (!props.className || props.className === '') {
            totalStudents = state.students.length;

        }
        else {
            let displayStudents = [...state.students];
            displayStudents = displayStudents.filter(
                (data) => data.className === props.className
            );
            totalStudents = displayStudents.length;
        }




        if (props.className && props.newStudent) {
            const students = state.students;
            const newStudent = props.newStudent;

            let currentID = state.maxID;
            newStudent.id = state.maxID;
            newStudent.className = props.className;
            newStudent.actions = newStudent.id;
            //console.log('MyClass newStudent', newStudent);

            students.push(newStudent);
            ++totalStudents;
            props.handleTotalStudents(totalStudents);

            //console.log('MyClass students', students);

            return {
                selectedClass: props.className,
                students: students,
                totalStudents: totalStudents,
                maxID: ++currentID,
                openSnackbar: true,
                snackbarInfo: 'Thêm sinh viên thành công !',
                severity: 'success',
            };
        }
        else {
            if (props.className !== state.selectedClass) {
                props.handleTotalStudents(totalStudents);
            }
            return {
                selectedClass: props.className,
                totalStudents: totalStudents,
            };
        }
        //return { selectedClass: props.className, newStudent: props.newStudent };
    }

    editRow = (id) => {
        console.log('editRow, id');
        const editStudent = this.state.students.find(
            (student) => student.id === id
        );

        console.log('editRow', id, editStudent);
        console.log('editRow', id, { ...editStudent });


        if (editStudent) {
            this.setState({
                openEditor: true,
                editStudent: editStudent,
                editedStudent: { ...editStudent },
            });
        }
    };

    deleteRow = (id) => {
        const editStudent = this.state.students.find(
            (student) => student.id === id
        );

        console.log('deleteRow', id, editStudent);
        if (editStudent) {
            this.setState({ openConfirmation: true, editStudent: editStudent });
        }
    };

    handleCloseConfirmation = (yes) => {
        //console.log('handleCloseConfirmation', yes);
        this.setState({ openConfirmation: false });
        if (yes) {
            let students = this.state.students;
            students = students.filter(
                (data) => data.id !== this.state.editStudent.id
            );
            const totalStudents = this.state.totalStudents - 1;
            //console.log('test', students);
            this.setState({
                students: students,
                totalStudents: totalStudents,
            });
            this.props.handleTotalStudents(totalStudents);
            this.setState({
                openSnackbar: true,
                snackbarInfo: 'Xóa thành công !',
                severity: 'success',
            });
        }
    };

    handleCloseConfirmation2 = (no) => {
        console.log('handleCloseConfirmation2', no);
        this.setState({ openConfirmation: false });
        if (no) {
            this.setState({ openSnackbar: true, snackbarInfo: 'Đã hủy !' });
        }
    };

    handleCloseEditor = (yes) => {
        //console.log('handleCloseConfirmation', yes);
        this.setState({ openEditor: false });
        if (yes) {
            console.log('handleCloseEditor: editStudent', this.state.editStudent);
            console.log('handleCloseEditor: editedStudent', this.state.editedStudent);
            let students = this.state.students;
            students = students.filter(
                (data) => data.id !== this.state.editedStudent.id
            );
            students.push(this.state.editedStudent);
            this.setState({
                students: students,
                editStudent: null,
                editedStudent: null,
                openSnackbar: true,
                snackbarInfo: 'Sửa thành công !',
                severity: 'success',
            });
            // let students = this.state.students;
            // students = students.filter(
            //     (data) => data.id !== this.state.editID
            // );
            // const totalStudents = this.state.totalStudents - 1;
            // //console.log('test', students);
            // this.setState({
            //     students: students,
            //     totalStudents: totalStudents,
            // });
            // this.props.handleTotalStudents(totalStudents);
            // this.setState({
            //     openSnackbar: true,
            //     snackbarInfo: 'Xóa thành công !',
            //     severity: 'success',
            // });
        }
        else {
            this.setState({
                editStudent: null,
                editedStudent: null,
            });
        }
    };

    setFirstName = (event) => {
        console.log('setFirstName', event.target.value);
        const editedStudent = this.state.editedStudent;
        editedStudent.firstName = event.target.value;
        this.setState(editedStudent);
    };

    setLastName = (event) => {
        console.log('setLastName', event.target.value);
        const editedStudent = this.state.editedStudent;
        editedStudent.lastName = event.target.value;
        this.setState(editedStudent);
    };

    setCountry = (event) => {
        console.log('setCountry', event.target.value);
        const editedStudent = this.state.editedStudent;
        editedStudent.country = event.target.value;
        this.setState(editedStudent);
    };



    handleSnackbarClose = () => {
        this.setState({
            openSnackbar: false,
            autoHideDuration: 6,
        });
    };


    exportToExcel = (fileName) => {
        console.log(this.state.students);
        const data = this.state.students.map((d) => {
            return {
                MSSV: d.mssv,
                Lớp: d.className,
                Họ: d.lastName,
                Tên: d.firstName,
                Gender: d.gender,
                CTDT: d.CTDT,
                SĐT: d.phone,
                DOB: d.dob,
                Email: d.email,
            };
        });

        console.log(data);
        const ws = XLSXUtils.json_to_sheet(data);
        const wb = XLSXUtils.book_new();
        XLSXUtils.book_append_sheet(wb, ws, fileName);
        writeFile(wb, `${fileName}.xlsx`);
    };
    // Alert = (props) => {
    //     return <MuiAlert elevation={6} variant='filled' {...props} />;
    // }


    // componentDidMount() {
    //     this.getData();
    // }

    // getData = () => {
    //     console.log('getData');
    //     fetch('https://randomuser.me/api/?results=5')
    //         .then((res) => res.json())
    //         .then(
    //             (data) => {
    //                 console.log('data', data.results);
    //                 let id = 1;
    //                 const dataWithId = data.results.map((record) => {
    //                     return {
    //                         // id: id++,
    //                         // first: record.name.first,
    //                         id: id++,
    //                         firstName: record.name.first,
    //                         lastName: record.name.last,
    //                         country: record.location.country,
    //                         phone: record.phone,
    //                         dob: moment(record.dob.date).format('DD/MM/YYYY'),
    //                         picture: record.picture.thumbnail
    //                     };
    //                 });
    //                 console.log('dataWithId', dataWithId);
    //                 this.setState({
    //                     students: dataWithId,
    //                 });
    //                 //formatData: moment(x.Date).format('DD/MM/YYYY'),

    //             },
    //             (error) => {
    //                 console.log('error', error);
    //             }
    //         );

    // };
    render() {
        //console.log('MyClass render', this.state.selectedClass);
        let displayStudents = [...this.state.students];
        displayStudents = displayStudents.filter(
            (data) => data.className === this.state.selectedClass
        );

        // const displayData = state.students.filter(
        //     (data) =>
        //     data,class === props.selectedClass ||
        //     props.selectedClass === ''

        // );
        return (
            <div style={{ height: 700, width: '100%' }}>
                <button onClick={() => this.exportToExcel('Users')}>
                    Export to Excel
                </button>

                <DataGrid rows={displayStudents} columns={this.state.columns} />
                <Dialog
                    open={this.state.openConfirmation}
                    onClose={() => this.handleCloseConfirmation(false)}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id='alert-dialog-title'>Bạn có chắc chắn muốn xóa sinh viên <Avatar alt='' src={this.state.editStudent?.picture} /> {this.state.editStudent?.firstName} {this.state.editStudent?.lastName} ?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">



                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => this.handleCloseConfirmation2(true)}
                            color='primary'
                        >Hủy
                        </Button>
                        <Button
                            onClick={() => this.handleCloseConfirmation(true)}
                            color='primary'
                        >Đồng ý
                        </Button>
                    </DialogActions>
                </Dialog>


                <Dialog open={this.state.openEditor} onClose={this.state.handCloseEditor} aria-labelledby="form-dilog-title">
                    <DialogTitle id="form-dialog-title" >Sửa thông tin</DialogTitle>
                    <DialogContent >
                        <TextField
                            autoFocus
                            margin="dense"
                            id="mssv"
                            onChange={this.setmssv}
                            label="MSSV"
                            type="text"
                            defaultValue={this.state.editStudent?.mssv}
                            width="50"

                        />
                        &nbsp;
                        &nbsp;
                        <TextField
                            autoFocus
                            margin="dense"
                            id="userName"
                            onChange={this.setUserName}
                            label="User Name"
                            type="text"
                            defaultValue={this.state.editStudent?.userName}
                            width="50"
                        />
                        &nbsp;
                        &nbsp;
                        <TextField
                            autoFocus
                            margin="dense"
                            id="password"
                            onChange={this.setPassword}
                            label="Mật khẩu"
                            type="text"
                            defaultValue={this.state.editStudent?.password}
                            width="50"
                        />
                        &nbsp;
                        &nbsp;
                        <TextField
                            autoFocus
                            margin="dense"
                            id="lastName"
                            onChange={this.setLastName}
                            label="Họ"
                            type="text"
                            defaultValue={this.state.editStudent?.lastName}
                            width="50"
                        />
                        &nbsp;
                        &nbsp;
                        <TextField
                            autoFocus
                            margin="dense"
                            id="firstName"
                            onChange={this.setFirstName}
                            label="Tên"
                            type="text"
                            defaultValue={this.state.editStudent?.firstName}
                            width="50"

                        />
                        &nbsp;
                        &nbsp;

                        <TextField
                            autoFocus
                            margin="dense"
                            id="country"
                            onChange={this.setCountry}
                            label="Địa chỉ"
                            type="text"
                            defaultValue={this.state.editStudent?.country}
                            width="50"
                        />
                        &nbsp;
                        &nbsp;
                        <TextField
                            autoFocus
                            margin="dense"
                            id="country"
                            onChange={this.setCountry}
                            label="SDT"
                            type="text"
                            defaultValue={this.state.editStudent?.country}
                            width="50"
                        />
                        &nbsp;
                        &nbsp;
                        <TextField
                            autoFocus
                            margin="dense"
                            id="country"
                            onChange={this.setCountry}
                            label="Star"
                            type="text"
                            defaultValue={this.state.editStudent?.country}
                            width="50"
                        />
                        &nbsp;
                        &nbsp;
                        <TextField
                            autoFocus
                            margin="dense"
                            id="country"
                            onChange={this.setCountry}
                            label="Comment"
                            type="text"
                            defaultValue={this.state.editStudent?.country}
                            width="50"
                        />
                        &nbsp;
                        &nbsp;
                        <TextField
                            autoFocus
                            margin="dense"
                            id="country"
                            onChange={this.setCountry}
                            label="Count"
                            type="text"
                            defaultValue={this.state.editStudent?.country}
                            width="50"
                        />
                        &nbsp;
                        &nbsp;
                        <TextField
                            autoFocus
                            margin="dense"
                            id="country"
                            onChange={this.setCountry}
                            label=""
                            type="text"
                            defaultValue={this.state.editStudent?.country}
                            width="50"
                        />
                        &nbsp;
                        &nbsp;
                        <TextField
                            autoFocus
                            margin="dense"
                            id="country"
                            onChange={this.setCountry}
                            label=""
                            type="text"
                            defaultValue={this.state.editStudent?.country}
                            width="50"
                        />
                        &nbsp;
                        &nbsp;
                        <TextField
                            autoFocus
                            margin="dense"
                            id="country"
                            onChange={this.setCountry}
                            label=""
                            type="text"
                            defaultValue={this.state.editStudent?.country}
                            width="50"
                        />
                        &nbsp;
                        &nbsp;

                        <TextField
                            autoFocus
                            margin="dense"
                            id="country"
                            onChange={this.setCountry}
                            label=""
                            type="text"
                            defaultValue={this.state.editStudent?.country}
                            width="50"
                        />
                        &nbsp;
                        &nbsp;
                        <TextField
                            autoFocus
                            margin="dense"
                            id="country"
                            onChange={this.setCountry}
                            label=""
                            type="text"
                            defaultValue={this.state.editStudent?.country}
                            width="50"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleCloseEditor(false)}
                            color="primary"
                        >
                            Hủy
                        </Button>
                        <Button onClick={() => this.handleCloseEditor(true)}
                            color="primary"
                        >
                            Lưu
                        </Button>

                    </DialogActions>

                </Dialog>



                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    open={this.state.openSnackbar}
                    //onClose={this.handleSnackbarClose}
                    autoHideDuration={600}
                    message={this.state.snackbarInfo}
                    key={{ vertical: 'bottom', horizontal: 'right' }}
                >

                    <MuiAlert
                        onClose={this.handleSnackbarClose}
                        severity={this.state.severity}
                        variant='filled'
                    >
                        {this.state.snackbarInfo}
                    </MuiAlert>
                </Snackbar>
            </div>
        );
    }
}

export default MyClass;