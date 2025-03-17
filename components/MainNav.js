import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';
import { useAtom } from "jotai"; 
import { searchHistoryAtom } from "@/store"; 

export default function MainNav() {
  const userName = "Dev Pandya";
  const router = useRouter();
  const [searchField, setSearchField] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const handleToggle = () => setIsExpanded(!isExpanded);
  const handleLinkClick = () => setIsExpanded(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedSearch = searchField.trim();
    if (!trimmedSearch) return;
    
    const queryString = `title=true&q=${trimmedSearch}`;
    setSearchHistory(current => [...current, queryString]); // Updating search history

    router.push(`/artwork?${queryString}`);
    setSearchField(""); 
    setIsExpanded(false);
  };

  return (
    <>
      <Navbar className="fixed-top navbar-light" style={{ backgroundColor: "#0d6efd" }} expanded={isExpanded} expand="lg">
        <Navbar.Brand className="ms-5" style={{color: "#ffffff"}}>Dev Pandya</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" onClick={handleLinkClick}>
            <Link href="/" passHref legacyBehavior>
              <Nav.Link style={{color: "#ffffff"}}>Home</Nav.Link>
            </Link>
            <Link href="/search" passHref legacyBehavior>
              <Nav.Link style={{color: "#ffffff"}}>Advanced Search</Nav.Link>
            </Link>
          </Nav>

          <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
            />
            <Button type="submit" variant="outline" className="btn btn-warning">Search</Button>
          </Form>

          <Nav>
            <NavDropdown title={userName} id="user-dropdown" className="ms-auto me-5" >
              <Link href="/favourites" passHref legacyBehavior>
                <NavDropdown.Item onClick={handleLinkClick}>
                  Favourites
                </NavDropdown.Item>
              </Link>
              <Link href="/history" passHref legacyBehavior>
                <NavDropdown.Item onClick={handleLinkClick}>
                  Search History
                </NavDropdown.Item>
              </Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div style={{ paddingTop: '60px' }}></div>
    </>
  );
}
