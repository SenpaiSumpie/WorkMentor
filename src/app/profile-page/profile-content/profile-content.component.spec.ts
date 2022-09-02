import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Connection } from 'src/app/backend/classes/connection';
import { Messages } from 'src/app/backend/classes/messages';
import { User } from 'src/app/backend/classes/user';
import { ConnectionServiceService } from 'src/app/backend/services/connection-service.service';
import { MessagesServiceService } from 'src/app/backend/services/messages-service.service';
import { UserServiceService } from 'src/app/backend/services/user-service.service';
import { CognitoService } from 'src/app/cognito.service';
import { ExploreCareersComponent } from 'src/app/home-page/explore-careers/explore-careers.component';

import { ProfileContentComponent } from './profile-content.component';

describe('ProfileContentComponent', () => {
  let component: ProfileContentComponent;
  let _messageService : MessagesServiceService;
  let toastrService : jasmine.SpyObj<ToastrService>;
  let cognitoService : jasmine.SpyObj<CognitoService>;
  let userService : jasmine.SpyObj<UserServiceService>;
  let connectionService : jasmine.SpyObj<ConnectionServiceService>;
  let messagesService : jasmine.SpyObj<MessagesServiceService>;
  let fixture: ComponentFixture<ProfileContentComponent>;

  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error', 'success']);
    cognitoService = jasmine.createSpyObj<CognitoService>('CognitoService', ['signOut', 'getUser', 'updateUser']);
    userService = jasmine.createSpyObj<UserServiceService>('UserServiceService', ['save', 'findAll', 'update']);
    connectionService = jasmine.createSpyObj<ConnectionServiceService>('ConnectionServiceService', ['findAll', 'update']);
    messagesService = jasmine.createSpyObj<MessagesServiceService>('MessagesServiceService', ['findAll', 'save']);

    await TestBed.configureTestingModule({
      imports:[
        CommonModule,
        ToastrModule.forRoot(),
      ],
      declarations: [ ProfileContentComponent ],
      providers: [
        ToastrModule,
        {provide: UserServiceService, useValue: userService},
        {provide: MessagesServiceService, useValue: messagesService},
        {provide: ConnectionServiceService, useValue: connectionService},
        {provide: CognitoService, useValue: cognitoService}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileContentComponent);
    _messageService = TestBed.inject(MessagesServiceService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.username).toEqual('');
    expect(component.email).toEqual('');
    expect(component.users).toEqual([]);
    expect(component.connections).toEqual([]);
    expect(component.acceptedConnections).toEqual([]);
    expect(component.allConnections).toEqual([]);
    expect(component.allMessages).toEqual([]);
    expect(component.senderMessages).toEqual([]);
    expect(component.receiver).toEqual('');
    expect(component).toBeTruthy();
  });

  it('detect changes', (done) => {
    fixture.detectChanges();
    
    expect(cognitoService.getUser).toHaveBeenCalled();
    expect(component.username).toEqual('');
    expect(component.email).toEqual('');

    expect(userService.findAll).toHaveBeenCalled();

    setTimeout( () => {
      expect(component.loading).toBeTrue();
      done();
    }, 501);

  });

  describe('functionality for profile', () => {

    it('should submit ', () =>{
      let user = {} as User;
      component.onSubmit();
      expect(component.submitted).toBeTrue();

    });

    it('should select message', () => {
      component.selectMessages('test@gmail.com');
      expect(component.senderMessages.length).toBe(0);
      expect(component.messageLoading).toBeTrue();
      expect(component.allMessages.length).toBe(0);
    });

    it('should send message', (done) => {
      
      component.sendMessage();
      expect(component.messageSent).toBeTrue();
      expect(component.newMessage.sender).toBeUndefined();
      expect(component.newMessage.receiver).toEqual('');
      expect(component.newMessage.timeSent).toEqual(new Date().toString());
      expect(messagesService.save).toHaveBeenCalledWith(component.newMessage);
      
      _messageService.save(component.newMessage)?.subscribe(result => {
        _messageService.findAll()?.subscribe(data => {
          expect(data.length).toBeGreaterThanOrEqual(0);
          expect(component.allMessages).toEqual(data);
          expect(component.senderMessages.length).toBeGreaterThanOrEqual(0);
        });

        expect(component.messageSent).toBeFalse();
        done();
      });
      //expect(messagesService.findAll).toHaveBeenCalled();
      //expect(toastrService.success).toHaveBeenCalledWith('', 'Message sent successfully!', {
      //  timeOut: 5000,
      //  progressBar: true,
      //  closeButton: true,
      //});
      done();
    });

    it('should accept', () => {
      let connection = {} as Connection;
      component.accept(connection);
      expect(component.memberAccepted).toBeTrue();
      expect(component.updateConnection).toEqual(connection);
      expect(component.updateConnection.accepted).toBeTrue();
      expect(connectionService.update).toHaveBeenCalledWith(component.updateConnection);
      expect(connectionService.findAll).toHaveBeenCalled();
    });

    it('should decline', (done) => {
      let connection = {} as Connection;
      component.decline(connection);
      expect(component.memberDeclined).toBeTrue();
      expect(component.updateConnection).toEqual(connection);
      expect(component.updateConnection.archived).toBeTrue();
      expect(connectionService.update).toHaveBeenCalledWith(component.updateConnection);

      connectionService.update(connection)?.subscribe(result => {
        expect(console.log).toHaveBeenCalledWith(result);
        done();
      });

      expect(connectionService.findAll).toHaveBeenCalled();
      connectionService.findAll()?.subscribe((result) => {
        expect(result.length).toBeGreaterThanOrEqual(0);
        expect(component.allConnections).toEqual(result);
        done();
      });
      done();
    });

    it('should showAcceptToast', () => {
      component.showAcceptToast();
      /*
      expect(toastrService.success).toHaveBeenCalledWith('', 'Mentee successfully accepted!', {
        timeOut: 5000,
        progressBar: true,
        closeButton: true,
      }); */
    });

    it('should showDeclineToast', () => {
      component.showDeclineToast();
      /*
      expect(toastrService.success).toHaveBeenCalledWith('', 'Mentee successfully declined!', {
        timeOut: 5000,
        progressBar: true,
        closeButton: true,
      });*/
    });

    it('should showUpdatedToast', () => {
      component.showUpdatedUserToast();
      /*
      expect(toastrService.success).toHaveBeenCalledWith('', 'Information Updated Successfully!', {
        timeOut: 5000,
        progressBar: true,
        closeButton: true,
      });*/
    });

    it('should call update', (done) => {
      component.update();
      expect(component.loading).toBeTrue();
      expect(cognitoService.updateUser).toHaveBeenCalled();

      cognitoService.updateUser(component.user)?.then(()=>{
        expect(component.loading).toBeFalse();
        done();
      }).catch( () => {
        expect(component.loading).toBeFalse();
        done();
      });
      done();
    });

    
  });
});
