import axios from 'axios'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import { Baseurl } from '../baseurl'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { isLogged } from '../redux/actions'

const Profile = ({ profile }) => {
    const history = useHistory();
    const dispatch = useDispatch()
    const logOut = () => {
        let token = sessionStorage.Token;
        axios
            .post(
                `${Baseurl}auth/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                if (res.data.message) {
                    history.push("/login");
                    dispatch(isLogged(false));
                    sessionStorage.removeItem("Token");
                    localStorage.removeItem("cart");
                    localStorage.removeItem("sections");
                    localStorage.removeItem("course");
                    localStorage.removeItem("code");
                    sessionStorage.removeItem('Path')
                }
            });
    };
    return (
        <>
            <div class="page-content page-container mx-auto mb-5" id="page-content" style={{ marginTop: '100px' }}>
                <div class="row container d-flex justify-content-center mx-auto">
                    <div class="col-md">
                        <div class="profile-card user-card-full">
                            <div class="row m-l-0 m-r-0">
                                <div class="col-sm-4 bg-c-lite-green user-profile">
                                    <div class="card-block text-center text-white">
                                        <div class="m-b-25"> <img src="https://img.icons8.com/bubbles/100/000000/user.png" class="img-radius" alt="User" /> </div>
                                        <h6 class="f-w-600">{profile.firstname ? profile.firstname : <i class="fas fa-spinner fa-spin" style={{ color: '#ffff' }}></i>} {profile.lastname}</h6>
                                        <h6><strong>{`Earnings: ₦${profile.earnings ? profile.earnings : 0}`}</strong></h6>

                                        {profile.email_verified_at === null ? <> {profile.email_verified_at === null ? <span onClick={() => history.push(`/account-verification/${profile.email}`)} class="badge bg-danger text-white p-2" style={{ cursor: 'pointer' }}><i class="fad fa-info-circle"></i> Verify your account</span> : ''}</> : <Link to='/dashboard/earnings-withdraw' class="badge p-2 text-light" style={{ cursor: 'pointer', backgroundColor: '#294E51' }}>Withdraw</Link>}
                                    </div>
                                </div>
                                <div class="col-sm-8">
                                    <div class="card-block">
                                        <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <p class="m-b-10 f-w-600"><i class="fad fa-envelope" style={{ color: '#071B4D' }}></i> Email</p>
                                                <small class="text-muted f-w-400">{profile.email ? profile.email : <small><Skeleton count={1} /></small>}</small>
                                            </div>
                                            <div class="col-sm-6">
                                                <p class="m-b-10 f-w-600"><i class="fas fa-mobile" style={{ color: '#071B4D' }}></i> Phone</p>
                                                <small class="text-muted f-w-400">{profile.phone ? profile.phone : <small><Skeleton count={1} /></small>}</small>
                                            </div>
                                        </div>
                                        <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Settings</h6>
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <h6 class="m-b-10 f-w-600">Account</h6>
                                                <Link to='/dashboard/settings' class="text-muted f-w-400" style={{ cursor: 'pointer' }}><i class="fad fa-sliders-h-square" style={{ color: '#071B4D' }}></i> <small>Account Settings</small></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <strong onClick={logOut}> <small className='text-danger' style={{ cursor: 'pointer' }}><i class="fad fa-toggle-off mb-2"></i> Logout</small></strong>
                </div>
            </div>

        </>
    )
}

export default Profile
