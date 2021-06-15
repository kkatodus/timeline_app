import React, { Component } from 'react';

class CreateForm extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <form action="http://localhost:8000/diaries" method="post" type="multipart/form-data">
                    <input name="content" type="text"/>
                    <input name="photos" type="file"/>
                    <button>Save</button>
                </form>

            </div>
         );
    }
}
 
export default CreateForm;