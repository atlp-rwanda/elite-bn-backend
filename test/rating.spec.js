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

describe('rating average and written review tests', ()=>{


  it('It should allow any user to view the rating average and written review', (done) => {
    chai.request(app)
      .get('/api/v1/rating/rateReviews')
      .end((err, response) => {
        response.should.have.status(200);
        done();
      })
  })


      });