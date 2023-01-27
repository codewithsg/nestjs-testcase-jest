import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response } from 'express';
import { PaymentsController } from './payments.controller';

describe('PaymentsController', () => {
  let controller: PaymentsController;

const statusResponseMock = {
  send:jest.fn((x)=>x)
}

  let requestMock = {
    query:{},
  } as unknown as Request;

  let responseMock = {
    status:jest.fn((x)=>statusResponseMock),
    send:jest.fn((x)=>x)
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPayments',()=>{
    it('should return a status of 400',()=>{
      controller.getPayments(requestMock,responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(401);
      expect(statusResponseMock.send).toHaveBeenCalledWith({message:'missing count or page query parameter'});
    })

    it('should return a status of 200 when query params are present',()=>{
      requestMock.query = {
        count:'10',
        page:'1'
      };
      controller.getPayments(requestMock,responseMock);
      expect(responseMock.send).toHaveBeenCalledWith(200);
    })
  })
});
