import React, { useRef, useEffect } from 'react';
import { FaUserCog, FaGraduationCap } from 'react-icons/fa';
import { FiInfo, FiPhone, FiLock } from 'react-icons/fi';
import { useSelector } from 'react-redux';

function ViewProfile() {
  const users = useSelector((state) => state.entities.users);
  const { viewUser } = users;

  const bioRef = useRef();

  useEffect(() => {
    bioRef.current.style.height = `${bioRef.current.scrollHeight}px`;
  });

  function formatDate(date) {
    const curr = new Date(date);
    return curr.toISOString().substr(0, 10);
  }

  return (
    <div className="section-container edit-profile">
      <div className="section-container__header">
        <div className="d-flex">
          <FaUserCog className="section-container__heading-icon" />
          <h4>{`Viewing ${viewUser?.firstname}'s Profile`}</h4>
        </div>
      </div>

      <div className="section-container__body edit-profile__body">
        <form>
          <h6>{`${viewUser?.firstname}'s Profile Picture`}</h6>
          <section className="edit-profile__profile">
            <figure>
              <img
                src={viewUser?.profileImage}
                alt={`${viewUser?.firstname}`}
              />
            </figure>
          </section>

          <textarea
            name="bio"
            readOnly
            ref={bioRef}
            defaultValue={viewUser?.bio}
          />

          <fieldset>
            <span className="legend">
              <FiInfo /> User Information
            </span>
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>First name</label>
              <input
                readOnly
                type="text"
                name="firstname"
                defaultValue={viewUser?.firstname}
              />
            </div>
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Last name</label>
              <input
                readOnly
                type="text"
                name="lastname"
                defaultValue={viewUser?.lastname}
              />
            </div>
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Middle name</label>
              <input
                readOnly
                type="text"
                name="middlename"
                defaultValue={viewUser?.middlename}
              />
            </div>
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Birth date</label>
              <input
                readOnly
                type="date"
                name="birthdate"
                defaultValue={viewUser && formatDate(viewUser.birthdate)}
              />
            </div>
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Gender</label>
              <select readOnly name="sex" defaultValue={viewUser?.sex}>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </fieldset>

          <fieldset>
            <span className="legend">
              <FiLock /> Account Information
            </span>
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Username</label>
              <input
                readOnly
                type="text"
                name="username"
                defaultValue={viewUser?.username}
              />
            </div>
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Email</label>
              <input
                readOnly
                type="text"
                name="email"
                defaultValue={viewUser?.email}
              />
            </div>
          </fieldset>

          <fieldset>
            <span className="legend">
              <FiPhone /> Contact Information
            </span>
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Address</label>
              <input
                readOnly
                type="text"
                name="address"
                defaultValue={viewUser?.address}
              />
            </div>
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Status</label>
              <select readOnly name="status" defaultValue={viewUser?.status}>
                <option value="1">Single</option>
                <option value="2">Engaged</option>
                <option value="3">Married</option>
                <option value="4">Separated</option>
              </select>
            </div>
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Phone</label>
              <input
                readOnly
                type="text"
                name="phone"
                defaultValue={viewUser?.phone}
              />
            </div>
          </fieldset>

          <fieldset>
            <span className="legend">
              <FaGraduationCap /> Education
            </span>
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>Elementary</label>
              <input
                readOnly
                type="text"
                name="elementary"
                defaultValue={viewUser?.school?.elementary}
              />
            </div>
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>High School</label>
              <input
                readOnly
                type="text"
                name="highschool"
                defaultValue={viewUser?.school?.highschool}
              />
            </div>
            <div className="form-group">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>College</label>
              <input
                readOnly
                type="text"
                name="college"
                defaultValue={viewUser?.school?.college}
              />
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default ViewProfile;
