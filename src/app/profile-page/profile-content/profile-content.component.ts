import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Connection } from 'src/app/backend/classes/connection';
import { Messages } from 'src/app/backend/classes/messages';
import { User } from 'src/app/backend/classes/user';
import { ConnectionServiceService } from 'src/app/backend/services/connection-service.service';
import { MessagesServiceService } from 'src/app/backend/services/messages-service.service';
import { UserServiceService } from 'src/app/backend/services/user-service.service';

import { IUser, CognitoService } from 'src/app/cognito.service';

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.css'],
})
export class ProfileContentComponent implements OnInit {
  loading: boolean;
  messageSent: boolean;
  memberAccepted: boolean;
  memberDeclined: boolean;
  messageLoading: boolean;

  submitted: boolean;
  user: IUser;
  theUser: User;
  username: string = '';
  email: string = '';
  users: User[] = [];
  connections: Connection[] = [];
  acceptedConnections: Connection[] = [];
  allConnections: Connection[] = [];
  updateConnection: Connection;

  allMessages: Messages[] = [];
  senderMessages: Messages[] = [];
  newMessage: Messages;

  receiver: string = '';

  constructor(
    private toastr: ToastrService,
    private cognitoService: CognitoService,
    private userService: UserServiceService,
    private connectionService: ConnectionServiceService,
    private messagesService: MessagesServiceService
  ) {
    this.loading = true;
    this.messageSent = false;
    this.memberAccepted = false;
    this.memberDeclined = false;
    this.submitted = false;
    this.messageLoading = false;
    this.user = {} as IUser;
    this.theUser = {} as User;
    this.updateConnection = {} as Connection;
    this.newMessage = {} as Messages;
  }

  public ngOnInit(): void {
    this.cognitoService.getUser()?.then((data) => {
      if (data != null) {
        this.username = data['username'];
        this.email = data.attributes['email'];
      }
    });
    this.userService.findAll()?.subscribe((data) => {
      this.users = data;
      const userInfo = this.users.filter((search) => {
        return search.email == this.email && search.username == this.username;
      });

      this.theUser = userInfo[0];
    });

    setTimeout(() => {
      if (this.theUser.memberType == 'Mentor') {
        this.connectionService.findAll()?.subscribe((data) => {
          this.allConnections = data;

          this.connections = this.allConnections.filter((result) => {
            return (
              result.mentor == this.email &&
              result.accepted == false &&
              result.archived == false
            );
          });

          this.acceptedConnections = this.allConnections.filter((result) => {
            return result.mentor == this.email && result.accepted == true;
          });
          this.loading = false;
        });
      } else if (this.theUser.memberType == 'Mentee') {
        this.connectionService.findAll()?.subscribe((data) => {
          this.allConnections = data;

          this.acceptedConnections = this.allConnections.filter((result) => {
            return result.mentee == this.email && result.accepted == true;
          });
          this.loading = false;
        });
      }
    }, 500);
  }

  onSubmit() {
    this.submitted = true;
    this.userService.update(this.theUser)?.subscribe((result) => {
      this.submitted = false;
      console.log(result);
    });
    setTimeout(() => {
      this.showUpdatedUserToast();
      this.submitted = false;
    }, 1000); // Shouldn't have to do this but oh well
  }

  selectMessages(email: string): void {
    this.messageLoading = true;
    this.receiver = email;
    this.messagesService.findAll()?.subscribe((data) => {
      this.allMessages = data;
      this.senderMessages = this.allMessages.filter((result) => {
        return (
          (result.sender == this.theUser.email && result.receiver == email) ||
          (result.sender == email && result.receiver == this.theUser.email)
        );
      });
      this.messageLoading = false;
    });
  }

  sendMessage(): void {
    this.messageSent = true;

    this.newMessage.sender = this.theUser.email;
    this.newMessage.receiver = this.receiver;

    this.newMessage.timeSent = new Date().toString();

    this.messagesService.save(this.newMessage)?.subscribe((result) => {
      this.messagesService.findAll()?.subscribe((data) => {
        this.allMessages = data;
        this.senderMessages = this.allMessages.filter((result) => {
          return (
            (result.sender == this.theUser.email &&
              result.receiver == this.receiver) ||
            (result.sender == this.receiver &&
              result.receiver == this.theUser.email)
          );
        });
      });
      this.messageSent = false;

      this.newMessage.message = '';
      this.toastr.success('', 'Message sent successfully!', {
        timeOut: 5000,
        progressBar: true,
        closeButton: true,
      });
      console.log(result);
    });
  }

  accept(connection: Connection): void {
    this.memberAccepted = true;

    this.updateConnection = connection;
    this.updateConnection.accepted = true;
    this.connectionService.update(this.updateConnection)?.subscribe((result) => {
      console.log(result);
    });

    this.connectionService.findAll()?.subscribe((data) => {
      this.allConnections = data;
      this.connections = this.allConnections.filter((result) => {
        return (
          result.mentor == this.email &&
          result.accepted == false &&
          result.archived == false
        );
      });

      if (this.theUser.memberType == 'Mentor') {
        this.acceptedConnections = this.allConnections.filter((result) => {
          return result.mentor == this.email && result.accepted == true;
        });
      } else if (this.theUser.memberType == 'Mentee') {
        this.acceptedConnections = this.allConnections.filter((result) => {
          return result.mentee == this.email && result.accepted == true;
        });
      }
      this.memberAccepted = false;
      this.showAcceptToast();
    });
  }

  decline(connection: Connection): void {
    this.memberDeclined = true;

    this.updateConnection = connection;
    this.updateConnection.archived = true;

    this.connectionService.update(this.updateConnection)?.subscribe((result) => {
      console.log(result);
    });

    this.connectionService.findAll()?.subscribe((data) => {
      this.allConnections = data;

      this.connections = this.allConnections.filter((result) => {
        return (
          result.mentor == this.email &&
          result.accepted == false &&
          result.archived == false
        );
      });

      this.acceptedConnections = this.allConnections.filter((result) => {
        return result.mentor == this.email && result.accepted == true;
      });
      this.memberDeclined = false;

      this.showDeclineToast();
    });
  }

  showAcceptToast(): void {
    this.toastr.success('', 'Mentee successfully accepted!', {
      timeOut: 5000,
      progressBar: true,
      closeButton: true,
    });
  }

  showDeclineToast(): void {
    this.toastr.success('', 'Mentee successfully declined!', {
      timeOut: 5000,
      progressBar: true,
      closeButton: true,
    });
  }

  showUpdatedUserToast(): void {
    this.toastr.success('', 'Information Updated Successfully!', {
      timeOut: 5000,
      progressBar: true,
      closeButton: true,
    });
  }

  public update(): void {
    this.loading = true;
    this.cognitoService
      .updateUser(this.user)?.then(() => {
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  }
}
