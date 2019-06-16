import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler
{
    handleError(error:any)
    {
        alert('unexpected Error Ocurred!');
        console.log(error);
    }
}
