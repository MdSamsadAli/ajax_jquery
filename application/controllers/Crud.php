<?php
class Crud extends CI_Controller
{
    public function index()
    {
        $this->load->view('crud/index');
    }

    public function insert() 
    {
        $response = $this->crud_model->save();
        echo json_encode($response);
    }
    public function get()
    {
        $response = $this->crud_model->get();
        echo json_encode($response);
    }
    
    public function edit()
    {
        $id = $this->input->post('id');
        $response = $this->crud_model->edit($id);
        echo json_encode($response);
    }

    public function update() 
    {
        $id = $this->input->post('id');
        $response = $this->crud_model->update($id);
        echo json_encode($response);
    }

    public function destroy()
    {
        $response = $this->crud_model->delete();
        echo json_encode($response);
    }
}