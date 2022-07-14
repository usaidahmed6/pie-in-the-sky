import React, { useState } from 'react'
import Navebar from '../navebar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {
    itemsRef,
    addDoc,
    storage,
    getDownloadURL,
    ref,
    uploadBytes
} from './firebase'

const AddItems = () => {
    const [ItemName, setItemName] = useState('');
    const [ItemPrice, setItemPrice] = useState('');
    const [ItemDescription, setItemDescription] = useState('');
    const [ItemImage, setItemImage] = useState('');

    // controls input field **************

    const onCahangeName = (e) => {
        setItemName(e.target.value);
        // console.log('name=>',ItemName);
    }

    const onCahangePrice = (e) => {
        setItemPrice(e.target.value);
        // console.log('name=>',ItemName);
    }

    const onCahangeDescription = (e) => {
        setItemDescription(e.target.value);
        // console.log('name=>',ItemName);
    }
    const onCahangeImage = (e) => {

        setItemImage(e.target.files[0]);
        // console.log('name=>',ItemName);
    }

    // console*************************

    // console.log('image=====>', ItemImage);
    // console.log('name=>', ItemName);
    // console.log('price=>', ItemPrice);
    // console.log('Description=>', ItemDescription);

    const onFinish = async () => {

        console.log('name========>', ItemName);
        console.log('price=======>', ItemPrice);
        console.log('Description=>', ItemDescription);
        console.log('image=======>', ItemImage);
        const image = await uploadImageToFirebase(ItemImage);
        console.log('upload=======>', image);
        if (image) {

        const obj = {
            name: ItemName,
            price: ItemPrice,
            description: ItemDescription,
            image
        }

        console.log('objects======>', obj)

        await addDoc(itemsRef, obj)
        }
        else{
            console.log('err=======>');
        }
    }



    const uploadImageToFirebase = async (file) => {
        let imageItem;
        try {
            const storeageRef = ref(storage, file.name)
            const upload = await uploadBytes(storeageRef, file)
            console.log('file uploaded')
            const imageUrl = await getDownloadURL(storeageRef)
            imageItem = imageUrl
            console.log('image item========', imageItem)
        } catch (err) {
            console.log(err.msg)
        }
        return imageItem
    }

    return (
        <Navebar>
            <h2 className='text-center mb-4'>
                Add Items
            </h2>
            <Form>
                <InputGroup className="mb-4">
                    <InputGroup.Text id="basic-addon1" >Name</InputGroup.Text>
                    <Form.Control
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onChange={onCahangeName}
                    />
                </InputGroup>

                <InputGroup className="mb-4">
                    <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                    <Form.Control
                        placeholder="price"
                        aria-label="price"
                        aria-describedby="basic-addon2"
                        onChange={onCahangePrice}
                    />
                </InputGroup>

                <Form.Group controlId="formFileSm" className="my-4">
                    <Form.Label>Chose Image </Form.Label>

                    <Form.Control type="file" onChange={onCahangeImage} />
                </Form.Group>

                <InputGroup>
                    <InputGroup.Text>Description</InputGroup.Text>
                    <Form.Control as="textarea" aria-label="With textarea" onChange={onCahangeDescription} />
                </InputGroup>


            </Form>
            <Button variant="primary" type="submit" className='my-4' onClick={onFinish}>
                Submit
            </Button>
        </Navebar>
    )
}

export default AddItems
