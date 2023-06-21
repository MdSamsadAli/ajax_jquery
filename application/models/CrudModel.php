<?php
class CrudModel extends CI_Model
{
    public function save()
    {
        $title = $this->input->post('title');
        $price = $this->input->post('price');
        $description = $this->input->post('description');

        // Image Upload
        $config['upload_path'] = './assets/upload/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg';
        // Add any additional configuration options as needed
        $this->load->library('upload', $config);

        if ($this->upload->do_upload('file')) {
            $image_data = $this->upload->data();
            $image = $image_data['file_name'];

            $data = array(
                'title' => $title,
                'price' => $price,
                'description' => $description,
                'product_img' => $image
            );
            $response = $this->db->insert('products', $data);
            return $response;
        } else {
            $error = array('error' => $this->upload->display_errors());
            echo json_encode($error);
        }
    }
    public function get()
    {
        $this->db->order_by('id', 'DESC');
        $query = $this->db->get('products');
        return $query->result_array();
    }
    public function edit($id)
    {
        $this->db->select('*');
        $this->db->from('products');
        $this->db->where('id', $id);
        $result = $this->db->get()->row();
        return $result;
    }
    public function update()
    {
        $title = $this->input->post('title');
        $price = $this->input->post('price');
        $description = $this->input->post('description');

        // Image Upload
        $config['upload_path'] = './assets/upload/';
        $config['allowed_types'] = 'gif|jpg|png|jpeg';
        // Add any additional configuration options as needed
        $this->load->library('upload', $config);

        if ($this->upload->do_upload('file')) {
            $image_data = $this->upload->data();
            $image = $image_data['file_name'];

            $data = array(
                'title' => $title,
                'price' => $price,
                'description' => $description,
                'product_img' => $image
            );
            $response = $this->db->update('products', $data);
            return $response;
        } else {
            $error = array('error' => $this->upload->display_errors());
            echo json_encode($error);
        }
    }

    public function delete()
    {
        $id = $this->input->post('id');
        $query = $this->db->delete('products', array('id' => $id));
        return $query;
    }
}