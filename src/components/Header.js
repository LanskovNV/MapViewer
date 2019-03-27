/* eslint-disable no-unused-vars */
import React from 'react';
import { Badge, Card } from 'react-bootstrap';

class Header extends React.Component {
  render() {
    return (
      <div>
        <Card className="text-center">
          <Card.Body>
            <Card.Title>
              {' '}
              <h1>
                Map <Badge variant="info">Viewer</Badge>
              </h1>{' '}
            </Card.Title>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Header;
