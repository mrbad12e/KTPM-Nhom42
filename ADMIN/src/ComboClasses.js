import { Autocomplete } from '@mui/material';
import React from 'react';
import TextField from '@material-ui/core/TextField';
// import IconButton from '@mui/material/IconButton';
// import ClearIcon from '@mui/icons-material/Clear';
// import CloseIcon from '@mui/icons-material/Close';

// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import { makeStyles } from '@material-ui/core';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';

class ComboClasses extends React.Component {
    constructor(props) {
        super(props);

        // const useStyles = makeStyles((theme) => ({
        //     formControl: {
        //         margin: theme.spacing(1),
        //         minWidth: 200,
        //     },
        //     selectEmpty: {
        //         marginTop: theme.spacing(2),
        //     },
        // }));

        // const columns = [
        //     { field: 'Country', headerName: 'Country', width: 250 },
        //     { field: 'Slug', headerName: 'Slug', width: 250 },
        //     { field: 'ISO2', headerName: 'ISO2', width: 150 },
        // ];
        // this.state = {

        //     columns: columns,
        //     rows: [],
        //     useStyles: useStyles,
        //     selectedCountry: '',
        // };

        this.state = {

            data: [
                {
                    year: 2020, name: '12 A1',

                },
                {

                    year: 2021, name: '11 A7',
                },
                {

                    year: 2019, name: 'IOS A7',
                },
                {

                    year: 2018, name: 'YTX A7',
                },
                {

                    year: 2023, name: 'BCD A7',
                },
                {

                    year: 2022, name: 'ABC A7',
                },
            ],
            selectedClass: '',
        };

    }

    // componentDidMount() {
    //     this.getData();
    // }

    // handleChange = (event) => {
    //     console.log('ComboCountry chon: ', event.target.value);
    //     this.setState({ selectedCountry: event.target.value });
    //      this.props.handleChange(event.target.value);
    // };
    handleChange = (event, value) => {
        console.log('ComboClass chon lop: ', value);
        this.setState({ selectedClass: value?.name });
        this.props.handleChange(value?.name)
    };

    render() {
        return (
            <div style={{ minWidth: 200 }}>
                <Autocomplete
                    id='combo-box-lop'
                    sx={{ width: 300 }}
                    options={this.state.data}
                    getOptionLabel={(option) => option.name}
                    onChange={this.handleChange}
                    style={{
                        background: 'white',
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label=''
                            variant='outlined'
                            placeholder='Chọn lớp'

                        />
                    )}
                />

            </div>
        );

    }
}

export default ComboClasses;
