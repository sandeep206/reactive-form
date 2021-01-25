import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { AppService } from './app.service';
import { User } from './model/user';

describe('AppService', () => {
    let service: AppService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(AppService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => httpMock.verify());

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be able to post user data', () => {
        const user: User = {
            firstName: 'Thomas',
            lastName: 'Shelby',
            email: 'thomas@shelby.co.uk',
            password: 'PeakyBlinders'
        };

        service.postUser(user).subscribe((responseUser) => {
            expect(responseUser).toEqual(user);
        });

        const mockRequest = httpMock.expectOne(`${service.apiURI}`);
        expect(mockRequest.request.method).toBe('POST');
        mockRequest.flush(user);
    });
});
