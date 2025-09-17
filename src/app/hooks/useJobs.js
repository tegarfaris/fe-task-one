import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  REQUEST_ADD_JOBS,
  REQUEST_DELETE_JOB,
  REQUEST_DETAIL_JOB,
  REQUEST_GET_LIST_JOB,
  REQUEST_UPDATE_JOB,
} from "../../features/job/actions";

const useJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobList, pending, success, detailJob, isEmpty, refetch } =
    useSelector((state) => state.jobs);

  const getJobList = useCallback(() => {
    dispatch(REQUEST_GET_LIST_JOB()).then((result) => {
      if (result.meta.requestStatus === "rejected") {
        console.error("Gagal boss:", result.error);
      }
    });
  }, [dispatch]);

  const getDetailJob = useCallback(
    (id) => {
      dispatch(REQUEST_DETAIL_JOB(id)).then((result) => {
        if (result.meta.requestStatus === "rejected") {
          console.error(result.error);
        }
      });
    },
    [dispatch]
  );

  const addJob = useCallback(
    (newProduct) => {
      dispatch(REQUEST_ADD_JOBS(newProduct)).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          alert("Berhasil ditambahkan");
          navigate("/job-list");
        } else if (result.meta.requestStatus === "rejected") {
          console.error("error nich: ", result.error);
        }
      });
    },
    [dispatch, navigate]
  );

  const updateJob = useCallback(
    (updateJob) => {
      dispatch(REQUEST_UPDATE_JOB(updateJob)).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          alert("Job has been updated");
          navigate("/job-list");
        } else if (result.meta.requestStatus === "rejected") {
          console.error(result.error);
          navigate("/job-list");
        }
      });
    },
    [dispatch, navigate]
  );

  const deleteJob = useCallback(
    (id) => {
      dispatch(REQUEST_DELETE_JOB(id)).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          alert("Job successfully deleted !");
        } else if (result.meta.requestStatus === "rejected") {
          console.error(result.error);
        }
      });
    },
    [dispatch]
  );

  return {
    jobList,
    pending,
    success,
    isEmpty,
    detailJob,
    refetch,
    getJobList,
    addJob,
    updateJob,
    deleteJob,
    getDetailJob,
  };
};

export default useJobs;
