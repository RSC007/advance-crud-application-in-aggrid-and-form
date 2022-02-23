// from libraries
import swal from "sweetalert";

export const deletePopup = (deleteRecord, id = null, message) => {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this Detail!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal(message, {
        icon: "success",
      });
      typeof id === "number"
        ? deleteRecord({ endPoint: "user", id: id })
        : deleteRecord({ endPoint: "user", body: id, id: id.id });
    } else {
      swal("This detail is safe!");
    }
  });
};
