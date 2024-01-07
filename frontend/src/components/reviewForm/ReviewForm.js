import {Form,Button} from 'react-bootstrap';
import {useState} from "react";
import {useUser} from "../context/UserContext";

const ReviewForm = ({handleSubmit,revText,labelText,defaultValue, like, dislike}) => {
    const [interacted, setInteracted] = useState(false);

    const user = useUser();

    const handleInteracted = () => {
        setInteracted(true);
    }

    return (
        <div>

            {user.username.replace(/\s+/g, '') === '' ?
                (
                    <span>Log in to leave a review</span>
                )
                :
                (
                    <>
                        <div onClick={handleInteracted}>
                            <Button variant="outline-info" onClick={like}>Like</Button>
                            <Button variant="outline-info" onClick={dislike}>Dislike</Button>
                        </div>
                        {interacted?
                            (<Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>{labelText}</Form.Label>
                                    <Form.Control ref={revText} as="textarea" rows={3} defaultValue={defaultValue}/>
                                </Form.Group>
                                <Button variant="outline-info" onClick={handleSubmit}>Submit</Button>
                            </Form>
                            )
                        :
                            (
                                <></>
                            )
                        }

                    </>
                )
            }
        </div>
    )
}

export default ReviewForm