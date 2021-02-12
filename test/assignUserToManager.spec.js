/*eslint-disable */
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import app from '../src/index';
import User from '../src/models/user';
import { exist } from 'joi';
import userServices from '../src/services/userService';
require('@babel/polyfill');

chai.use(chaiHttp);
chai.should();

const updateUser = {
	"id": 18,
	"lineManagerId": 3
}

const manager={
  email:'trojanx07@gmail.com',
  password:'admin1234'
}
const roleId= 3

let token ='';
let userid= null;
const id= 3;
let permissionName = 'assignUsertoManager'
describe.only('User Assign tests', ()=>{

  it('login manager', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(manager)
      .end((err, response) => {
        response.should.have.status(200);
        token = response.body.data.token;
        done();
      });
  });
  it('It should allow Manager to assign user to a Manager', (done) => {
    chai.request(app)
      .put('/api/v1/users/assign/manager')
      .send({'id':3,'lineManagerId':10})
      .set('Authorization',token)
      .set('permission_name', permissionName)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

      // it('should not assign User to a Manager with the null value', (done) => {
      //   chai.request(app)
      //     .put('/api/v1/users/assign/manager')
      //     .send('')
      //     .end((err, response) => {
      //       response.should.have.status(500);
      //       response.body.should.have.property('message');
      //       done();
      //     });
      // });
      // it('should not assign User to a Manager with a negative value', (done) => {
      //     const updateUser={
      //         lineManagerId:0,
      //         id:3
      //     }
      //   chai.request(app)
      //     .put('/api/v1/users/assign/manager')
      //     .send(updateUser)
      //     .end((err, response) => {
      //       response.should.have.status(400);
      //       response.body.should.have.property('message');
      //       done();
      //     });
      // });

      // //get verified user with assigned manager

      // it('should display the user with assigned manager', (done) => {
      //   chai.request(app)
      //     .get(`/api/v1/users/getUser/${id}`)
      //     .end((err, response) => {
      //       response.should.have.status(200);
      //       response.body.should.have.property('message');
      //       done();
      //     });
      // });
      });