/*eslint-disable */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';
require('@babel/polyfill');

chai.should();
chai.use(chaiHttp);

const userRate={
    email:"neddyberry@gmail.com",
    password:"admin1234"
}

let token ='';

describe.only('rating average and written review tests', ()=>{

  it('login manager', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(userRate)
      .end((err, response) => {
        response.should.have.status(200);
        token = response.body.data.token;
        console.log(token,'.....................');
        done();
      })
  })
  it('It should allow Authenticated user to view the rating average and written review', (done) => {
    chai.request(app)
      .get('/api/v1/rating/rateReviews')
      .set('Authorization',`Bearer ${token}`)
      .end((err, response) => {
          console.log(token,'>>>>>>>>>>><<<<<<<<<<<<<');
        response.should.have.status(200);
        done();
      })
  })

  it('It should not allow unauthenticated user to view the rating average and written review', (done) => {
    chai.request(app)
      .get('/api/v1/rating/rateReviews')
      .end((err, response) => {
        response.should.have.status(400);
        done();
      })
  })


      });