$(document).off("click", "#addModal");
$(document).on("click", "#addModal", function (e) {
	e.preventDefault();
	// alert();
	$("#showModal").show();
});

$(document).off("click", "#addBtn");
$(document).on("click", "#addBtn", function (e) {
	
	var update_id = $(this).attr("value");
	var AddUpdate = update_id ? "insert" : "update";

	e.preventDefault();
	var img = $("#img")[0].files[0]; // Retrieve the selected file
	var title = $("#title").val();
	var price = $("#price").val();
	var description = $("#description").val();

	var formData = new FormData();
	formData.append("file", img);
	formData.append("title", title);
	formData.append("price", price);
	formData.append("description", description);
	formData.append("id", update_id);
	// alert(img);
	// alert(title);

	$.ajax({
		url: "crud/" + AddUpdate,
		data: formData,
		dataType: "json",
		type: "POST",
		contentType: false,
		processData: false,
		success: function (response) {
			console.log(response);
			fetchProducts();

			$("#form")[0].reset();
			$("#showModal").modal("hide");
		},
	});
});

function fetchProducts() {
	$.ajax({
		url: "crud/get",
		type: "POST",
		dataType: "json",
		data: {},
		success: function (response) {
			var div = "";
			for (var i = 0; i < response.length; i++) {
				var row = response[i];
				div += '<div class="col-md-4">';
				div += '<div class="card mb-4">';
				div +=
					'<img src="./assets/upload/' +
					row["product_img"] +
					'" class="card-img-top" alt="..." height="300px">';
				div += '<div class="card-body">';
				div +=
					'<div class="d-flex justify-content-between align-items-center">';
				div += "<div>";
				div += '<h5 class="card-title">' + row["title"] + "</h5>";
				div += '<p class="card-text">' + row["description"] + "</p>";
				div += '<p class="card-text">Rs.' + row["price"] + "</p>";
				div += "</div>";
				div += "<div>";
				div += `
				<button type="submit" class="btn btn-primary btn-sm" id="editBtn" value="${row["id"]}"><i class="fa-solid fa-pen-to-square"></i></button>
				<button type="submit" class="btn btn-danger btn-sm" id="deleteBtn" value="${row["id"]}"><i class="fa-solid fa-trash"></i></button>
				
				`;
				div += "</div>";
				div += "</div></div></div></div>";
			}
			// Append the generated HTML to the container element on your page
			$("#container").html(div);
		},
	});
}
$(document).ready(function () {
	fetchProducts();
});

$(document).on("click", "#editBtn", function (e) {
	e.preventDefault();
	var id = $(this).attr("value");
	// alert(id);

	$.ajax({
		url: "crud/edit",
		type: "POST",
		dataType: "json",
		data: { id: id },
		success: function (data) {
			console.log(data);
			$("#id").val(data.id);
			$("#title").val(data.title);
			$("#description").val(data.description);
			$("#price").val(data.price);

			// Check if the product image is available
			if (data.product_img) {
				// Create a new image element and set its attributes
				var imageElement = document.createElement("img");
				imageElement.setAttribute("src", "./assets/upload/" + data.product_img);
				imageElement.setAttribute("class", "card-img-top");
				imageElement.setAttribute("alt", "...");
				imageElement.setAttribute("height", "300px");

				// Clear the existing image container and append the new image element
				$("#imageContainer").empty().append(imageElement);

				// Set the selected file name in the hidden input field
				$("#selectedFile").val(data.product_img);
			} else {
				// If no product image is available, clear the image container and reset the hidden input field
				$("#imageContainer").empty();
				$("#selectedFile").val("");
			}

			$("#showModal").modal("show");
		},
	});
});

$(document).on("click", "#deleteBtn", function (e) {
	e.preventDefault();
	var id = $(this).attr("value");
	// alert(id);
	$.ajax({
		url: "crud/destroy",
		type: "POST",
		dataType: "json",
		data: { id: id },
		success: function (data) {
			console.log(data);
			fetchProducts();
		},
	});
});
