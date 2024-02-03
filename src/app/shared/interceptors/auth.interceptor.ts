import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("token");

  if(token){
    req = req.clone({
      setHeaders: {
        authorization: token,
      },
    });
  }
  return next(req);
};
