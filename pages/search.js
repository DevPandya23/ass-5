import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Form, Button, Row, Col } from 'react-bootstrap';

const AdvancedSearch = () => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitForm = (data) => {
    const queryParams = new URLSearchParams();

    queryParams.append("searchBy", data.searchBy);
    if (data.geoLocation) queryParams.append("geoLocation", data.geoLocation);
    if (data.medium) queryParams.append("medium", data.medium);
    queryParams.append("isOnView", data.isOnView ? "true" : "false");
    queryParams.append("isHighlight", data.isHighlight ? "true" : "false");
    queryParams.append("q", data.q);

    router.push(`/artwork?${queryParams.toString()}`);
  };

  return (
    <Form onSubmit={handleSubmit(submitForm)}>
      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Search Query</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your search term"
              {...register("q", { required: true })}
              className={errors.q ? "is-invalid" : ""}
            />
            {errors.q && (
              <Form.Text className="text-danger">This field is required.</Form.Text>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Search By</Form.Label>
            <Form.Select {...register("searchBy", { required: true })} defaultValue="title">
              <option value="title">Title</option>
              <option value="tags">Tags</option>
              <option value="artistOrCulture">Artist or Culture</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Geo Location</Form.Label>
            <Form.Control type="text" placeholder="Enter a location" {...register("geoLocation")} />
            <Form.Text className="text-muted">
        Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
      </Form.Text>
          </Form.Group>
        </Col>

        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Medium</Form.Label>
            <Form.Control type="text" placeholder="Enter a medium" {...register("medium")} />
            <Form.Text className="text-muted">
        Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
      </Form.Text>
          </Form.Group>
          
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Check type="checkbox" label="Highlighted" {...register("isHighlight")} />
          <Form.Check type="checkbox" label="Currently on View" {...register("isOnView")} />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <Button variant="primary" type="submit" disabled={!!errors.q}>
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AdvancedSearch;
