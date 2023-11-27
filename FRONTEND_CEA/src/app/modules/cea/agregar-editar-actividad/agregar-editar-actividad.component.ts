import { Component, Inject, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActividadService } from 'src/app/core/services/actividad.service';
import { AlertaService } from 'src/app/core/services/alerta.service';
import { IActividad } from 'src/app/core/interfaces/actividad';
import { Imagenes } from 'src/app/core/interfaces/imagenes';
import { subirImagen } from 'src/app/core/interfaces/subir-imagen';



interface ExtendedFile extends File {
  ruta: string; // Otras propiedades adicionales que necesites
  estado: number;
}

@Component({
  selector: 'app-agregar-editar-actividad',
  templateUrl: './agregar-editar-actividad.component.html',
  styleUrls: ['./agregar-editar-actividad.component.css']
})

export class AgregarEditarActividadComponent implements OnInit {
  operacion:string='Agregar ';
  hide = true;
  id:number|undefined;
  fileInput!: ElementRef;
  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<AgregarEditarActividadComponent>,
    // private storage: AngularFireStorage,

    private fb: FormBuilder, private _actividad: ActividadService,
    private _alertaservice:AlertaService,
    @Inject(MAT_DIALOG_DATA) public data:any) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      objetivo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required],
      lugar: ['', Validators.required]
    });
    this.id=data.id;
  }

   imagen:any[]=[];

  //Imagenes

  //Subir a la base de datos 
  // onFileSelected(event: any) {
  //   const files = event.target.files;
  //   if (files) {
  //     for (let i = 0; i < files.length; i++) {
  //       const reader = new FileReader();
  //       reader.onload = (e: any) => {
  //         const newImage={
  //           ruta:e.target.result,
  //           estado:1
  //         };
  //         this.selectedImages.push(newImage);
  //       };
  //       reader.readAsDataURL(files[i]);
  //     }
  //   }
  //   // console.log(this.selectedImages);
  // }


  //Subir a Cloudinary y luego ala base de datos
//   files: ExtendedFile[] = [];
//  selectedImages: ExtendedFile[] = [];

//  onFileSelected(event: any) {
//     const fileList: FileList = event.target.files;
//     if (fileList) {
//       for (let i = 0; i < fileList.length; i++) {
//         const file: File = fileList[i];
//         const extendedFile: ExtendedFile = Object.assign(file, {
//           ruta: '',
//           estado: 1
//         });
      
//         const reader = new FileReader();
//         reader.onload = async (e: any) => {
//           extendedFile.ruta = await subirImagen(extendedFile);
//           this.selectedImages.push(extendedFile);
//         };
//         reader.readAsDataURL(file);
//       }
//     }
//   }
files: ExtendedFile[] = [];
selectedImages: ExtendedFile[] = [];

// Función para manejar la selección de archivos





// temporaryImages: ExtendedFile[] = [];
// selectedImages: ExtendedFile[] = [];

// temporaryImages: ExtendedFile[] = [];
// selectedImages: ExtendedFile[] = [];

// onFileSelected(event: any) {
//   const fileList: FileList = event.target.files;
//   if (fileList) {
//     for (let i = 0; i < fileList.length; i++) {
//       const file: ExtendedFile = fileList[i] as ExtendedFile;
//       file.ruta = '';
//       file.estado = 1;
//       this.temporaryImages.push(file);
//     }
//   }
// }

// saveImagesToCloudinary() {
//   for (const extendedFile of this.temporaryImages) {
//     subirImagen(extendedFile)
//       .then((cloudinaryUrl) => {
//         extendedFile.ruta = cloudinaryUrl;
//         this.selectedImages.push(extendedFile);
//       })
//       .catch((error) => {
//         // Manejar errores de subida de imagen
//       });
//   }
// }


  removeImage(index: number) {
    this.selectedImages.splice(index, 1);
  }

  ngOnInit(): void {
     this.esEditar(this.id);
     this._actividad.obtenerActividades();
  }
  esEditar(id?:number){
    if (id!==undefined) {
      this.operacion="Editar ";
      this.obtenerActividad(id);
    }
  }

  obtenerActividad(id:number){
    this.selectedImages.splice(0, this.selectedImages.length);
    this._actividad.obtenerActividad(id).subscribe(data=>{
  
      this.selectedImages=[...data.imagenes]
        this.form.patchValue({
          nombre:data.nombre,
          objetivo:data.objetivo,
          descripcion:data.descripcion,
          fecha:data.fecha,
          lugar:data.lugar, 
        })
    })
   
  }
 
  //  addEditarActividad() {
  //   console.log('Hola')
  //   if (this.form.invalid) {
  //     return;
  //   }
  //   const actividad: IActividad = {
  //     nombre: this.form.value.nombre,
  //     objetivo: this.form.value.objetivo,
  //     descripcion: this.form.value.descripcion,
  //     fecha: this.form.value.fecha,
  //     lugar: this.form.value.lugar,
  //     estado: 1,
  //     imagenes:this.selectedImages

  //   };
  //   // console.log(actividad);
  //   if (this.id==undefined) {
  //     this._actividad.agregarActividad(actividad).subscribe((resp) => {
  //      // Obtén el archivo que desees procesar
  //       this._alertaservice.mensajeAgregar("Acticvidad agregada");
       
  //     }, (e) => {
  //       console.log(e.error)
  //     });
  //     this.selectedImages.splice(0, this.selectedImages.length);
  //   }
  //   else{
  //     this._actividad.editarActividad(this.id,actividad).subscribe(r=>{
        
  //       this._alertaservice.mensajeAgregar("Actividad modificada");
  //     });
  //     this.selectedImages.splice(0, this.selectedImages.length);
  //   }
  //   this._actividad.obtenerActividades();
  //   this.dialogRef.close(true);
  
  // };

  cancelar() {
    this.dialogRef.close(false);
  };

  // async uploadImagesToCloudinary(): Promise<void> {
  //   try {
  //     for (const extendedFile of this.selectedImages) {
  //       extendedFile.ruta = await subirImagen(extendedFile);
  //     }
  //     this.addEditarActividad();
  //   } catch (error) {
  //     console.error('Error uploading images:', error);
  //   }
  // }
  // async uploadImagesToCloudinary(): Promise<void> {
  //   const files: FileList = this.fileInput.nativeElement.files;
  //   try {
  //     for (let i = 0; i < files.length; i++) {
  //       const file: File = files[i];
  //       const extendedFile: ExtendedFile = {
  //         file,
  //         ruta: '',
  //         estado: 1,
  //         lastModified: file.lastModified,
  //         name: file.name,
  //         webkitRelativePath: file.webkitRelativePath
  //       };
  //       extendedFile.ruta = await subirImagen(extendedFile);
  //       this.selectedImages.push(extendedFile);
  //     }
  //     this.addEditarActividad();
  //   } catch (error) {
  //     console.error('Error uploading images:', error);
  //   }
  // }
  async  addEditarActividad() {
    console.log('Hola');
    if (this.form.invalid) {
      return;
    }
  
    const actividad: IActividad = {
      nombre: this.form.value.nombre,
      objetivo: this.form.value.objetivo,
      descripcion: this.form.value.descripcion,
      fecha: this.form.value.fecha,
      lugar: this.form.value.lugar,
      estado: 1,
      imagenes: this.selectedImages
    };
  
    if (this.id == undefined) {
      this._actividad.agregarActividad(actividad).subscribe((resp) => {
        this._alertaservice.mensajeAgregar("Actividad agregada");
        this._actividad.obtenerActividades();
        this.dialogRef.close(true);
      }, (e) => {
        console.log(e.error);
      });
    } else {
      this._actividad.editarActividad(this.id, actividad).subscribe((r) => {
        this._alertaservice.mensajeAgregar("Actividad modificada");
        this._actividad.obtenerActividades();
        this.dialogRef.close(true);
      });
    }
  }
  
  async subirImagenesYAceptar() {
    // Sube las imágenes a Cloudinary
    const urls = await Promise.all(this.selectedImages.map(subirImagen));
    // Asigna las URLs a las imágenes en selectedImages
    for (let i = 0; i < urls.length; i++) {
      this.selectedImages[i].ruta = urls[i];
    }
    // Continúa con la lógica de addEditarActividad
    this.addEditarActividad();
  }
  
  onFileSelected(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        const file: File = fileList[i];
        const extendedFile: ExtendedFile = Object.assign(file, {
          ruta: '',
          estado: 1
        });
  
        const reader = new FileReader();
        reader.onload = (e: any) => {
          extendedFile.ruta = e.target.result;
          this.selectedImages.push(extendedFile); // Almacena el objeto extendedFile en selectedImages
        };
        reader.readAsDataURL(file);
      }
    }
  }
}
   
