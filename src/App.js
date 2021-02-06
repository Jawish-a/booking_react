import "./App.css";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    let myData;
    axios
      .get("https://booking-tnafos.herokuapp.com/courses/")
      .then(function (response) {
        // console.log(response);
        myData = response.data;
        console.log(myData);
        setCourses(myData)
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

  }, []);
  
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    course: 1,
    total: 150,
  });

  const submitForm = async (event) => {
    event.preventDefault();
    console.log("got it");
    console.log();
    console.log(order);

    try {
      const {data:{uuid}} = await axios.post("https://booking-tnafos.herokuapp.com/order/", order)
      const response = await axios.post(`https://booking-tnafos.herokuapp.com/checkout/${uuid}/get_payment_url/`);
      window.location.href = response.data.url

    } catch (error) {
      console.log(error)
    }

  };

  const textChangeHandler = (event) => {
    setOrder({ ...order, [event.target.name]: event.target.value });
  };

  if(loading) return <div>Loading...</div>
  return (
    <div className="App">
      <div className="container pt-5">
        <Form onSubmit={submitForm}>
          <FormGroup>
            <Label for="name">الاسم الاول</Label>
            <Input
              type="text"
              name="first_name"
              // onChange={}
              onChange={textChangeHandler}
              required="true" // ali added this line
            />
          </FormGroup>
          <FormGroup>
            <Label for="name">الاسم الاخير</Label>
            <Input
              type="text"
              name="last_name"
              onChange={textChangeHandler}
              required="true" // ali added this line
            />
          </FormGroup>
          <FormGroup>
            <Label for="name">الاسم الاخير</Label>
            <Input
              type="text"
              name="email"
              onChange={textChangeHandler}
              required="true" // ali added this line
            />
          </FormGroup>
          <FormGroup>
            <Label for="name">الاسم الاخير</Label>
            <Input
              type="text"
              name="mobile"
              onChange={textChangeHandler}
              required="true" // ali added this line
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleSelect">Select</Label>
            <Input type="select" name="course" id="exampleSelect">
              <option disabled>اختر الدورة</option>
              {courses.map((c) => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </Input>
          </FormGroup>
          <Button type="submit">Send</Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
